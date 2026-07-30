# Usage
> [API References - jsr](https://jsr.io/@yano3nora/ts-utils/doc)

```sh
npm i @yano3nora/ts-utils
```

```ts
import { objectByKeys } from '@yano3nora/ts-utils'

objectByKeys([1, 2, 3], (key) => Number(key) * 10)
// => { '1': 10, '2': 20, '3': 30 }
```

# Development
```sh
code libs/new-function.ts # add function
code libs/new-function.test.ts # add test
code main.ts # add export

deno task dev
```

## build & test
```sh
# build
deno task build

# link on local
deno task link
cd ../another-project
npm link package-name
```

# Release
`scripts/release.ts` wraps the flow: version bump (`package.json` and `deno.jsonc`
are kept in sync), test/build (dnt runs type check and Node tests for both CJS/ESM),
npm/jsr publish dry-runs, and a human-only publish gate.
Publishing uses your `npm login` session; the commit and tag are pushed atomically first.
Publishing to [jsr](https://jsr.io/@yano3nora/ts-utils) is a separate manual `deno publish`.

```sh
# 1. Bump version in package.json (via npm version, no git side effects),
#    run tests and dnt build, then `npm publish --dry-run`.
#    Nothing is pushed or published.
mise run release:prepare -- 1.0.0

# 2. Review the diff, then commit and tag it yourself.
git add -A && git commit -m 'release: v1.0.0'
git tag v1.0.0

# 3. Rebuild from the tagged commit, push the commit + tag (atomically),
#    `npm publish`, and create a GitHub Release with generated notes.
#    The explicit flag is a guard so this step is always a deliberate human action.
mise run release:publish -- 1.0.0 --i-understand-this-pushes-and-publishes
```
