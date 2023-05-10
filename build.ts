import { build, emptyDir } from 'https://deno.land/x/dnt@0.35.0/mod.ts'

await emptyDir('./npm')
await build({
  entryPoints: ['./main.ts'],
  outDir: './npm',
  shims: { deno: true },
  package: {
    name: '@yano3nora/ts-utils',
    version: Deno.args[0].replace(/^v/, ''),
    description: 'typescript utils.',
    publishConfig: { access: 'public' },
    repository: {
      type: "git",
      url: "git+https://github.com/yano3nora/ts-utils.git",
    }
  },
  postBuild() {
    // Deno.copyFileSync('LICENSE', 'npm/LICENSE') // TODO
    Deno.copyFileSync('README.md', 'npm/README.md')
  },
})
