import { build, emptyDir } from 'https://deno.land/x/dnt@0.40.0/mod.ts'
import templatePackageJson from './package.json' with { type: 'json' }

await emptyDir('./npm')
await build({
  entryPoints: ['./main.ts'],
  outDir: './npm',
  shims: { deno: true },
  package: {
    name: templatePackageJson.name,
    version: templatePackageJson.version,
    description: templatePackageJson.description,
    publishConfig: templatePackageJson.publishConfig,
    repository: templatePackageJson.repository,
    license: 'MIT',
  },
  postBuild() {
    Deno.copyFileSync('LICENSE', 'npm/LICENSE')
    Deno.copyFileSync('README.md', 'npm/README.md')
  },
})
