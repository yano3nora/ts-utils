const FLAGS = ['dry', 'run'] as const
const flag = Deno.args[0] as 'dry' | 'run'
const isDryRun = flag !== 'run'
const version = Deno.args[1] // npm version ${Deno.args[1]}
const otp = Deno.args[2] // one time password

if (!FLAGS.includes(flag)) {
  console.error('invalid flag')
  Deno.exit(1)
}

const command = new Deno.Command(
  'bash',
  {
    args: [
      '-c',
      `
        npm version ${version} --otp=${otp} \
          --git-tag-version=${isDryRun ? 'false' : 'true'} && \
        deno task build && \
        (cd npm && npm publish ${isDryRun ? '--dry-run' : ''}) \
        ${isDryRun ? '&& git checkout package.json' : ''}
      `,
    ],
  },
)

const { code, stdout, stderr } = command.outputSync()

if (code === 0) {
  console.log(new TextDecoder().decode(stdout))
} else {
  console.error(new TextDecoder().decode(stderr))
}

Deno.exit(code)
