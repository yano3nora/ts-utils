# Usage
> [API References - deno.land/x](https://deno.land/x/yano3nora_tsutils)

```sh
$ npm i @yano3nora/ts-utils
```

```ts
import { objectByKeys } from '@yano3nora/ts-utils'

objectByKeys([1, 2, 3], (key) => Number(key) * 10)
// => { '1': 10, '2': 20, '3': 30 }
```

# Development
```sh
$ code libs/new-function.ts # add function
$ code libs/new-function.test.ts # add test
$ code main.ts # add export

$ deno task dev
```

## build & test
```sh
# build
$ deno task build

# link on local
$ deno task link
$ cd ../another-project
$ npm link package-name
```

# Publish
```sh
$ git add .
$ git commit -m 'update'

# npm のログインセッションを使って publish する
$ npm login
$ export NPM_VERSION_SUB_COMMAND=minor # major | minor | patch

# dry run
$ deno task publish:dry ${NPM_VERSION_SUB_COMMAND}

# run
$ deno task publish:run ${NPM_VERSION_SUB_COMMAND}
$ git push --tags && git push
```
