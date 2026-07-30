import { build, emptyDir } from '@deno/dnt'
import templatePackageJson from './package.json' with { type: 'json' }

await emptyDir('./npm')
await build({
  entryPoints: ['./main.ts'],
  outDir: './npm',
  shims: { deno: true },
  // dnt 0.42 系は declaration map をデフォルト生成するが、src を同梱しない
  // npm 公開物では参照先がなく肥大化するだけなので無効にする
  declarationMap: false,
  compilerOptions: {
    // テストが依存する jsr:@std/assert が ES2025 の Set methods
    // (intersection 等) を使うため、型 lib だけ最新に上げる (emit target は不変)
    lib: ['ESNext'],
  },
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
