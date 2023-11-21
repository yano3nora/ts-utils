# Usage
> [API References - deno.land/x](https://deno.land/x/yano3nora_tsutils/main.ts)

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
$ code src/new-function.ts # add function
$ code src/new-function.test.ts # add test
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

$ export NPM_VERSION_SUB_COMMAND=minor # major | minor | patch
$ export ONE_TIME_PASSWORD=xxxxxx

# dry run
$ deno task publish:dry ${NPM_VERSION_SUB_COMMAND} ${ONE_TIME_PASSWORD}

# run
$ deno task publish:run ${NPM_VERSION_SUB_COMMAND} ${ONE_TIME_PASSWORD}
$ git push --tags
$ git push
```
