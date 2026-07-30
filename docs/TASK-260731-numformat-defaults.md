# TASK-260731: numformat の DEFAULTS が formatter に渡っていない bugfix

# 260731 numformat の DEFAULTS が formatter に渡っていない bugfix

## asis

`libs/numformat.ts` が `new Intl.NumberFormat(locales, options)` へ merge 前の
`options` を渡しており、`DEFAULTS.maximumFractionDigits: 1` が formatter
に一切効いていなかった (未指定時は Intl 標準の 3 桁で丸まる)。
小数系のテストが存在しなかったため発覚しなかった。

## tobe

- 未指定時に小数第 1 位で丸まる (DEFAULTS の意図通り)
- options 指定で default を上書きできる
- fraction digits / style 指定と矛盾して throw しない

## todo

- [x] 再現テストを先に追加し、失敗を確認する (numformat(1.25) が '1.3'
      にならない)
- [x] merge 済み options (独自キー除去済み) を formatter へ渡すよう修正
- [x] codex レビュー指摘の反映: default max は「style 未指定 (decimal) かつ
      min/max 未指定」のときだけ適用 (minimumFractionDigits 単独指定の
      RangeError 回避、currency / percent は Intl 本来の既定桁数を尊重)
- [x] 仕様を JSDoc の NOTE に明文化
- [x] codex exec で再レビュー → LGTM

## testcases

- [x] default: 1.25 → '1.3'、0.123 → '0.1'、1234.56 → '1,234.6'
- [x] 上書き: maximumFractionDigits 3 / 0
- [x] minimumFractionDigits 単独指定で RangeError にならない ('1.20')
- [x] currency (USD '$1,234.56') / percent ('12%') は Intl 既定桁数のまま
- [x] 既存の桁区切り・nan テストが通る (deno task test 40 passed / 68 steps)

## notes

- **利用側への影響 (要リリースノート)**: これまで未指定時は小数 3 桁
  だった表示が 1 桁に変わる。bugfix だが表示が変わるため、release は patch
  でなく minor を推奨
- テストは locale 依存を避けるため新規分に `locales: 'en-US'` を明示した
- BACKLOG の該当項目は完了につき削除済み
