# TASK-261029: 秘密鍵から n 桁の数字を作る hmacDigits を足す

# 261029 hmacDigits の追加

## asis

- 利用側の OTP やイベントコードは、秘密のない encoder で作られている。
- 作り方を知る人なら、誰でも値を計算できる。
- 秘密鍵から短い数字を作る util が、この package にない。

## tobe

- `hmacDigits(key, message, digits, hash?)` で、秘密鍵ベースの n
  桁の数字を作れる。
- HMAC の計算は Web Crypto に任せる。自作するのは切り詰めと 0 埋めだけにする。
  - 理由: Web Crypto は Node とブラウザの標準で、runtime 依存ゼロを保てる。
- 外部の OTP ライブラリは使わない。
  - 理由: 認証の土台を、第三者が保守するライブラリに預けない。

## todo

- [x] es-toolkit に同じ機能がないことを確かめる。ADR-0001 の業務 util に入れる。
- [x] `libs/hmac-digits.ts` と `libs/hmac-digits.test.ts` を足す。
- [x] `main.ts` に export を足す。
- [x] `deno lint`、`deno fmt`、`deno task test`、`deno task build` を通す。
- [x] 利用側のアプリに適用できるかを確かめる。
- [x] Codex にレビューを頼む。指摘 2 件を JSDoc に反映し、再レビューで LGTM。
- [ ] minor で release する。release は人間が行う。

## testcases

- [x] RFC 4226 付録 D の 10 件が、SHA-1 で一致する。
- [x] 既定の SHA-256 で、Node の `crypto.createHmac` と同じ値になる。
- [x] 先頭が 0 の値を、桁数どおりに 0 で埋める。
- [x] string と、その UTF-8 のバイト列で同じ値になる。
- [x] message の頭の文字列が違えば、違う値になる。
- [x] 空の message を受ける。
- [x] 空の key は RangeError にする。
- [x] digits が 1〜9 の整数でなければ RangeError にする。
- [x] dnt build で、Node の CJS と ESM の両方でテストが通る。
- [x] 利用側と同じ TS 5.7 と lib 設定で、型チェックが通る。

## notes

仕様の判断:

- digits は 1〜9 に限る。
  - 理由: 切り詰めの結果は 31 bit で、最大値は約 21 億。10 桁を一様に作れない。
- 空の key は拒否する。
  - 理由: env の設定漏れのまま、誰でも計算できる値を作らない。
  - Web Crypto も拒否するが、runtime ごとの差に頼らない。
- Uint8Array の引数は、内部で複製してから Web Crypto に渡す。
  - 理由: TS 5.9 以降、ArrayBufferLike 由来の型は BufferSource に代入できない。
- 照合・試行回数の制限・期限・使用済みの管理は、呼び出し側の責務にする。
- 違う message でも、同じ値になることがある。理由: 短い数字に切り詰めるため。
  - 値から対象を探すときは、複数の一致を呼び出し側で扱う。

利用側のアプリの調査 (2026-10-29):

- Node は 24.22.1 で、Web Crypto を標準で使える。TS は 5.7.3。
- 利用中の版は 0.34.0。1.x への更新で、利用中の関数の挙動は変わらない。
  - 理由: 0.34.0 からの差分は、戻り値の型注釈と format だけ。
- 利用側の作業で注意する点:
  - イベントコードから eventId を逆算できなくなる。当日の event
    のコードと照合して探す。
  - いまはイベントコードを client の component で作っている。秘密鍵を client
    に出さないよう、server で作る。
  - この package の `randomInt` は、暗号に使える乱数ではない。OTP には
    `node:crypto` の `randomInt` を使う。
