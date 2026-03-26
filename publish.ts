const FLAGS = ['dry', 'run'] as const
type Flag = typeof FLAGS[number]

const [flag, version] = Deno.args as [Flag | undefined, string | undefined]
const isDryRun = flag !== 'run'

if (!flag || !FLAGS.includes(flag)) {
  console.error('invalid flag: use "dry" or "run"')
  Deno.exit(1)
}

if (!version) {
  console.error('version is required: major | minor | patch | x.y.z')
  Deno.exit(1)
}

/**
 * 設計意図:
 * - npm login 済みのセッションをそのまま使う
 * - npm publish が対話入力を求めても詰まらないように標準入出力は inherit にする
 * - bash 連結ではなく 1 ステップずつ実行して失敗箇所を明確にする
 * - dry-run で更新された package.json / package-lock.json 系は最後に巻き戻す
 * - リリース事故を避けるため、実行前に作業ツリーや git 状態も検証する
 */
class StepError extends Error {
  constructor(readonly code: number) {
    super(`command failed with exit code ${code}`)
  }
}

async function runStep(command: string, args: string[], cwd?: string) {
  const commandText = [command, ...args].join(' ')
  console.log(`\n> ${commandText}`)

  const child = new Deno.Command(command, {
    args,
    cwd,
    stdin: 'inherit',
    stdout: 'inherit',
    stderr: 'inherit',
  }).spawn()

  const { code } = await child.status

  if (code !== 0) {
    throw new StepError(code)
  }
}

async function captureStep(
  command: string,
  args: string[],
  cwd?: string,
): Promise<string> {
  const output = await new Deno.Command(command, {
    args,
    cwd,
    stdout: 'piped',
    stderr: 'piped',
  }).output()

  if (output.code !== 0) {
    const stderr = new TextDecoder().decode(output.stderr).trim()
    console.error(stderr)
    throw new StepError(output.code)
  }

  return new TextDecoder().decode(output.stdout).trim()
}

type Snapshot = {
  path: string
  existed: boolean
  content?: Uint8Array
}

async function snapshotFile(path: string): Promise<Snapshot> {
  try {
    return {
      path,
      existed: true,
      content: await Deno.readFile(path),
    }
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return { path, existed: false }
    }
    throw error
  }
}

async function restoreSnapshot(snapshot: Snapshot) {
  if (snapshot.existed) {
    await Deno.writeFile(snapshot.path, snapshot.content!)
    return
  }

  try {
    await Deno.remove(snapshot.path)
  } catch (error) {
    if (!(error instanceof Deno.errors.NotFound)) {
      throw error
    }
  }
}

/**
 * なぜ必要か:
 * - version 更新や build 生成物の差分と、もともと手元にあった差分を区別できないと事故る
 * - dry-run の巻き戻し対象を増やしても、未コミット差分があると安全性は担保できない
 */
async function ensureCleanWorkingTree() {
  const status = await captureStep('git', ['status', '--short'])

  if (status !== '') {
    console.error(
      'working tree is not clean. commit or stash your changes before publish.',
    )
    Deno.exit(1)
  }
}

/**
 * なぜ必要か:
 * - npm login 切れやログイン先の取り違えを publish の最後で知るのは遅い
 * - 失敗理由を「npm login してから再実行」に絞って伝えた方が運用で迷わない
 */
async function ensureNpmLogin() {
  try {
    const username = await captureStep('npm', ['whoami'])
    console.log(`\n> npm whoami`)
    console.log(username)
  } catch (error) {
    if (error instanceof StepError) {
      console.error('npm login is required before publish.')
      Deno.exit(error.code)
    }

    throw error
  }
}

/**
 * なぜ必要か:
 * - run は git tag を打つので、git 管理下で現在ブランチが取れない状態は危険
 * - detached HEAD や未初期化 repo で版上げすると、あとで push 手順が破綻する
 */
async function ensureRunnableGitState() {
  const branch = await captureStep('git', [
    'branch',
    '--show-current',
  ])

  if (branch === '') {
    console.error(
      'run publish requires a checked out branch. detached HEAD is not supported.',
    )
    Deno.exit(1)
  }
}

const rollbackTargets = [
  'package.json',
  'package-lock.json',
  'npm/package.json',
  'npm/package-lock.json',
]
const rollbackSnapshots = isDryRun
  ? await Promise.all(rollbackTargets.map(snapshotFile))
  : []

let exitCode = 0

try {
  await ensureCleanWorkingTree()
  await ensureNpmLogin()

  if (!isDryRun) {
    await ensureRunnableGitState()
  }

  await runStep('npm', [
    'version',
    version,
    `--git-tag-version=${isDryRun ? 'false' : 'true'}`,
  ])
  await runStep('deno', ['task', 'build'])
  await runStep(
    'npm',
    ['publish', ...(isDryRun ? ['--dry-run'] : [])],
    `${Deno.cwd()}/npm`,
  )
} catch (error) {
  if (error instanceof StepError) {
    exitCode = error.code
  } else {
    throw error
  }
} finally {
  if (isDryRun) {
    for (const snapshot of rollbackSnapshots) {
      await restoreSnapshot(snapshot)
    }
  }
}

Deno.exit(exitCode)
