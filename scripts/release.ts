// Release flow の薄い wrapper (goreleaser 系 repo の scripts/release.ts と同型)。
// npm dual package のため compile/archive の代わりに dnt build と npm publish を扱う:
// version bump・test/build・publish dry-run・人間による publish ゲート。
//
// Flow:
//   1. prepare : bump + test/build + `npm publish --dry-run` (publish なしの検証)
//   2. 人間    : version bump を commit し、`git tag v<version>` を打つ
//   3. publish : 整合チェック → commit + tag を push → `npm publish` → GitHub Release

type CommandName = 'prepare' | 'publish'

const RELEASE_VERSION_ENV = 'TS_UTILS_RELEASE_VERSION'
const PUBLISH_FLAG = '--i-understand-this-pushes-and-publishes'

function usage(): string {
  return `Usage:
  deno run -A scripts/release.ts prepare <version>
  deno run -A scripts/release.ts publish <version> ${PUBLISH_FLAG}

Examples:
  mise run release:prepare -- 0.38.0
  mise run release:publish -- 0.38.0 ${PUBLISH_FLAG}
`
}

function parseArgs(): {
  command: CommandName
  version: string
  publishAllowed: boolean
} {
  const [rawCommand, rawVersion, ...rest] = Deno.args
  const command = rawCommand as CommandName | undefined
  const version = rawVersion ?? Deno.env.get(RELEASE_VERSION_ENV)

  if (command !== 'prepare' && command !== 'publish') {
    throw new Error(`Unknown command.\n\n${usage()}`)
  }
  if (version === undefined || !/^\d+\.\d+\.\d+$/.test(version)) {
    throw new Error(
      `Release version must be semver-like, for example 0.38.0.\n\n${usage()}`,
    )
  }

  return {
    command,
    version,
    publishAllowed: rest.includes(PUBLISH_FLAG),
  }
}

interface RunOptions {
  readonly cwd?: string
  // quiet: コマンドと stdout を表示しない。token など秘匿値を扱うコマンド用
  readonly quiet?: boolean
  // stream: 出力を端末へ直接流す (戻り値は空文字)。npm publish の OTP 入力にも必要
  readonly stream?: boolean
}

async function run(
  command: string,
  args: readonly string[],
  options: RunOptions = {},
): Promise<string> {
  if (!options.quiet) {
    console.log(`$ ${[command, ...args].join(' ')}`)
  }

  const child = new Deno.Command(command, {
    args: [...args],
    cwd: options.cwd ?? Deno.cwd(),
    stdin: options.stream ? 'inherit' : 'null',
    stdout: options.stream ? 'inherit' : 'piped',
    stderr: options.stream ? 'inherit' : 'piped',
  })
  const result = await child.output()
  let stdout = ''

  if (!options.stream) {
    stdout = new TextDecoder().decode(result.stdout)
    const stderr = new TextDecoder().decode(result.stderr)

    // quiet でも失敗時の stderr は出す。stdout は秘匿値の可能性があるため出さない
    if (!options.quiet && stdout.trim() !== '') {
      console.log(stdout.trimEnd())
    }
    if (stderr.trim() !== '' && (!options.quiet || !result.success)) {
      console.error(stderr.trimEnd())
    }
  }
  if (!result.success) {
    throw new Error(`Command failed: ${command} ${args.join(' ')}`)
  }

  return stdout
}

async function readJsonField(
  path: string,
  field: 'name' | 'version',
): Promise<string> {
  const json = JSON.parse(await Deno.readTextFile(path)) as Record<
    string,
    unknown
  >
  const value = json[field]

  if (typeof value !== 'string') {
    throw new Error(`"${field}" field was not found in ${path}.`)
  }
  return value
}

function readJsonVersion(path: string): Promise<string> {
  return readJsonField(path, 'version')
}

// 手書きの JSON 編集ではなく npm version に任せ、package-lock.json も同期して bump する。
// --git-tag-version=false で commit/tag の副作用を止め、tag 付けは人間に委ねる。
// version が同じでも常に実行し (--allow-same-version)、lock だけ古い状態も修復する
async function bumpVersion(version: string): Promise<void> {
  await run('npm', [
    'version',
    version,
    '--git-tag-version=false',
    '--allow-same-version',
  ])
  await bumpDenoJsonVersion(version)
}

// deno.jsonc (jsr 公開物) の version も package.json と同期して bump する。
// comment 付き JSONC のため JSON.parse では書き換えられず、version 行だけ置換する
async function bumpDenoJsonVersion(version: string): Promise<void> {
  const path = 'deno.jsonc'
  const text = await Deno.readTextFile(path)
  const replaced = text.replace(/("version":\s*")[^"]+(")/, `$1${version}$2`)

  if (!replaced.includes(`"version": "${version}"`)) {
    throw new Error(`Failed to bump the version field in ${path}.`)
  }

  await Deno.writeTextFile(path, replaced)
  console.log(`Bumped ${path} version to ${version}.`)
}

// jsr 公開物 (deno.jsonc) と npm 公開物 (package.json) の version
// 不一致を publish 前に止める
async function assertDenoJsonVersion(version: string): Promise<void> {
  const text = await Deno.readTextFile('deno.jsonc')

  if (!text.includes(`"version": "${version}"`)) {
    throw new Error(
      `deno.jsonc version does not match ${version}. Run release:prepare and commit the bump first.`,
    )
  }
}

// npm publish 後に gh release だけ失敗しても再実行できるよう、公開済みかを registry で確かめる
async function isPublishedOnNpm(
  name: string,
  version: string,
): Promise<boolean> {
  try {
    const stdout = await run('npm', ['view', `${name}@${version}`, 'version'], {
      quiet: true,
    })
    return stdout.trim() === version
  } catch {
    return false
  }
}

// dnt は root package.json の version を npm/package.json へ転写する。
// tag と公開物の食い違いを publish 前に止める最後の網がこのチェック
async function assertBuiltVersion(version: string): Promise<void> {
  const actual = await readJsonVersion('npm/package.json')

  if (actual !== version) {
    throw new Error(
      `Built package version mismatch: expected "${version}", got "${actual}".`,
    )
  }
}

// npm login 切れやログイン先の取り違えを publish の最後で知るのは遅いため先に確かめる
async function ensureNpmLogin(): Promise<void> {
  try {
    const username = (await run('npm', ['whoami'], { quiet: true })).trim()
    console.log(`npm whoami: ${username}`)
  } catch {
    throw new Error('npm login is required before publish.')
  }
}

async function assertCleanTree(): Promise<void> {
  const stdout = await run('git', ['status', '--porcelain'])
  if (stdout.trim() !== '') {
    throw new Error(
      'Working tree must be clean before publishing. Commit the version bump first.',
    )
  }
}

// npm publish は tag 済みコミットの内容から行う前提のため、tag が HEAD を指すことを保証する
async function assertTagAtHead(tag: string): Promise<void> {
  let tagCommit: string
  try {
    tagCommit =
      (await run('git', ['rev-parse', '--verify', `${tag}^{commit}`], {
        quiet: true,
      })).trim()
  } catch {
    throw new Error(
      `Tag ${tag} does not exist. Create it yourself first: git tag ${tag}`,
    )
  }

  const head = (await run('git', ['rev-parse', 'HEAD'], { quiet: true })).trim()
  if (tagCommit !== head) {
    throw new Error(
      `Tag ${tag} does not point at HEAD. Move the tag to the release commit or check out the tagged commit.`,
    )
  }
}

async function prepare(version: string): Promise<void> {
  await bumpVersion(version)
  await run('deno', ['task', 'test'], { stream: true })

  // dnt build は型チェックと Node (CJS/ESM) 両形式の変換後テストまで走る
  await run('deno', ['task', 'build'], { stream: true })
  await assertBuiltVersion(version)

  // publish で失敗しうる pack 〜 publint をここで先に失敗させておく (認証不要)
  await run('npm', ['publish', '--dry-run'], { cwd: 'npm', stream: true })

  // jsr 側の検証 (no-slow-types 等) も先に失敗させておく (認証不要)。
  // bump 直後の未コミット状態で走らせるため --allow-dirty が必要
  await run('deno', ['publish', '--dry-run', '--allow-dirty'], {
    stream: true,
  })

  console.log(
    '\nDry-run passed (validation only; publish rebuilds from the tag).',
  )
  console.log(
    `Review the diff, commit the bump, tag it (git tag v${version}), then run release:publish.`,
  )
}

async function publish(
  version: string,
  publishAllowed: boolean,
): Promise<void> {
  if (!publishAllowed) {
    throw new Error(
      `Refusing to push tags or publish without ${PUBLISH_FLAG}.`,
    )
  }

  const tag = `v${version}`

  if (await readJsonVersion('package.json') !== version) {
    throw new Error(
      `package.json version does not match ${version}. Run release:prepare and commit the bump first.`,
    )
  }
  await assertDenoJsonVersion(version)
  await assertCleanTree()
  await assertTagAtHead(tag)
  await ensureNpmLogin()

  // gh は自身の認証を使うため token の受け渡しは不要。push 前に認証だけ確かめて
  // 「npm publish 済みなのに Release だけ作れない」中途半端を避ける
  await run('gh', ['auth', 'status'], { quiet: true })

  // 手元の stale な npm/ を publish しないよう、tag 済みコミットの内容から作り直す
  await run('deno', ['task', 'build'], { stream: true })
  await assertBuiltVersion(version)

  // --atomic で branch だけ進んで tag が落ちる半端な状態を防ぐ。
  // npm publish が失敗しても remote の tag はそのままに publish だけ再実行できる
  await run('git', ['push', '--atomic', 'origin', 'HEAD', tag])

  // access public は root package.json の publishConfig 経由 (dnt が転写する)。
  // gh release だけ失敗した後の再実行で詰まないよう、公開済み version は skip する
  const name = await readJsonField('npm/package.json', 'name')
  if (await isPublishedOnNpm(name, version)) {
    console.log(`${name}@${version} is already on npm; skipping npm publish.`)
  } else {
    await run('npm', ['publish'], { cwd: 'npm', stream: true })
  }

  // 前 tag からの commit/PR で release notes を自動生成する。こちらも再実行に備えて skip 可能に
  try {
    await run('gh', ['release', 'view', tag], { quiet: true })
    console.log(`Release ${tag} already exists; skipping release creation.`)
  } catch {
    await run('gh', ['release', 'create', tag, '--generate-notes'], {
      stream: true,
    })
  }

  console.log(`Published ${tag}.`)
  console.log(
    'For jsr, run `deno publish` yourself (browser auth on first publish).',
  )
}

if (import.meta.main) {
  try {
    const { command, version, publishAllowed } = parseArgs()

    if (command === 'prepare') {
      await prepare(version)
    }
    if (command === 'publish') {
      await publish(version, publishAllowed)
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error))
    Deno.exit(1)
  }
}
