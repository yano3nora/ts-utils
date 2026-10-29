# TASK-261029: 秘密鍵から n 文字の文字列を作る hmacChars を足す

# 261029 hmacChars の追加

## asis

- `hmacDigits` は数字しか作れない。OTP
  やイベントコードの目視・口頭伝達には向く。
- 恒常的なパスワード (イベントページの Basic 認証) に使うと、8 桁で 1
  億通りしかない。 試行回数の制限がない環境では、総当たりに弱い。

## tobe

- `hmacChars(key, message, length, alphabet?, hash?)`
  で、秘密鍵ベースの文字列を作れる。
- 既定の alphabet は Crockford base32 (32 文字)。8 文字で 40 bit、約 1 兆通り。
- HMAC の計算を `hmacBytes` に切り出し、`hmacDigits` と共有する。

## todo

- [x] `libs/hmac-bytes.ts` を足し、`hmacDigits` の HMAC 計算を移す。
- [x] `libs/hmac-chars.ts` と `libs/hmac-chars.test.ts` を足す。
- [x] `main.ts` に export を足す。
- [x] `deno lint`、`deno fmt`、`deno task test`、`deno task build` を通す。
- [ ] minor で release する。release は人間が行う。

## testcases

- [x] 既定で length 文字の Crockford base32 になる。
- [x] 各文字が HMAC のバイトを 32 で割った余りに対応する。
- [x] 同じ入力で同じ値。key、message、message の頭の文字列で値が変わる。
- [x] 256 の約数の長さの alphabet を受ける (16 進、2 進)。
- [x] hash のバイト数いっぱいの length を受ける。
- [x] 範囲外の length は RangeError。
- [x] 256 の約数でない alphabet (base36 など) と、重複のある alphabet は
      RangeError。
- [x] 空の key は RangeError。
- [x] `hmacBytes` が RFC 4231 のテストベクタと一致する。
- [x] `hmacDigits` の既存テスト (RFC 4226) が通る。

## notes

- alphabet の長さを 256 の約数に限る。理由: バイトの余りで文字を選ぶとき、
  長さが約数でないと文字の出現確率に偏りが出る。base36 は使えない。
- length は hash のバイト数以下に限る。理由: 1 バイトから 1 文字を作る。
  長い値が要るなら SHA-512 (64 バイト) を使う。
- `hmacDigits` は OTP 用として残す。使い分けは JSDoc に書いた。
