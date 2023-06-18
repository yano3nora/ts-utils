ts-utils
===

# Usage
ref. [API References - deno.land/x](https://deno.land/x/yano3nora_tsutils)

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

## publish
```sh
$ deno task publish:dry ${NPM_VERSION_SUB_COMMAND} # major | minor | patch
$ deno task publish:run ${NPM_VERSION_SUB_COMMAND}
```
