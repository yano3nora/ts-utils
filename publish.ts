const FLAGS = ['dry', 'run'] as const
const flag = Deno.args[0] as 'dry' | 'run'
const version = Deno.args[1] // npm version ${Deno.args[1]}

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
        npm version ${version} \
          --git-tag-version=${flag === 'dry' ? 0 : 1} &&
        deno task build &&
        (cd npm && npm publish ${flag === 'dry' ? '--dry-run' : ''})
      `,
    ],
  },
)

const { code, stdout, stderr } = await command.output()

if (code === 0) {
  console.info(new TextDecoder().decode(stdout))
} else {
  console.error(new TextDecoder().decode(stderr))
}

Deno.exit(code)
