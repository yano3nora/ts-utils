import { build, emptyDir } from 'https://deno.land/x/dnt@0.35.0/mod.ts'

await emptyDir('./npm')

await build({
  entryPoints: ['./main.ts'],
  outDir: './npm',
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  package: {
    // package.json properties
    name: '@yano3nora/ts-utils',
    version: Deno.args[0],
    description: 'typescript utils.',
    publishConfig: {
      access: 'public',
    }
  },
  postBuild() {
    // steps to run after building and before running the tests
    // Deno.copyFileSync('LICENSE', 'npm/LICENSE')
    Deno.copyFileSync('README.md', 'npm/README.md')
  },
})
