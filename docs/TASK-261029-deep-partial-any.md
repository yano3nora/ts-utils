# TASK-261029: DeepPartial<any> が primitive を拒否する bugfix

# 261029 DeepPartial<any> が primitive を拒否する bugfix

## asis

- v1.0.0 で `DeepPartial` を再帰的にした。
- `DeepPartial<any>` は `{ [x: string]?: DeepPartial<any> }` になる。
  - 理由: any を mapped type にすると index signature になる。
- `{ payload: any }` のような型に `DeepPartial` を当てると、primitive の payload
  を代入できない。
- 利用側のアプリで、`payload: any` を持つ型に `DeepPartialPick` を当てた箇所が
  型エラーになった。

## tobe

- `DeepPartial<any>` は any のまま残る。primitive も object も代入できる。
- 既存の再帰のふるまいは変えない。

## todo

- [x] 再現テストを先に追加し、型エラーで失敗することを確かめる。
- [x] `0 extends 1 & T ? T : ...` で any を素通しする。
- [x] JSDoc に NOTE を書く。
- [x] `deno lint`、`deno fmt`、`deno task test`、`deno task build` を通す。
- [ ] patch で release する。release は人間が行う。

## testcases

- [x] `DeepPartial<{ payload: any; type: string }>` に `{ payload: 1 }`
      を代入できる。
- [x] 同じ型に `{ payload: { a: 1 } }` を代入できる。
- [x] `DeepPartial<any>` に string を代入できる。
- [x] 既存の `DeepPartial` / `DeepPartialPick` / `DeepNonNullable`
      のテストが通る。

## notes

- `0 extends 1 & T` は any の判定の定石。`1 & T` は any のときだけ any になり、
  0 を受ける。unknown や never では false になる。
