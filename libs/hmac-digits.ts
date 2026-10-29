import { hmacBytes } from './hmac-bytes.ts'

/**
 * HMAC(key, message) を RFC 4226 の dynamic truncation で digits 桁の数字文字列にする
 *
 * 秘密鍵を知る人だけが計算できる OTP・イベントコードなどの生成用。
 * 目視や口頭で伝える短い値に向く。恒常的なパスワードには {@linkcode hmacChars} を使う。
 * HMAC の計算は {@linkcode hmacBytes} (Web Crypto) に任せる。
 * 先頭が 0 の値も、桁数どおりに 0 で埋める。
 *
 * NOTE 同じ key と message からは、常に同じ値を返す。OTP では、時刻などで message を変える
 * NOTE 照合・試行回数の制限・期限・使用済みの管理は、呼び出し側で行う
 * NOTE 1 つの秘密鍵を複数の用途で使うときは、message の頭に用途ごとの文字列を付ける
 *      (例: `terminal:`, `event:`)。理由: 用途の間で値を計算し合えないようにする
 * NOTE 違う message でも、同じ値になることがある。理由: 短い数字に切り詰めるため。
 *      値から対象を探すときは、複数の一致を呼び出し側で扱う
 * NOTE Node 19 以上が必要。理由: それ未満は `globalThis.crypto` を標準で持たない
 *
 * @link https://www.rfc-editor.org/rfc/rfc4226#section-5.3
 * @param key 秘密鍵。string は UTF-8 のバイト列にする
 * @param message 署名する値。string は UTF-8 のバイト列にする
 * @param digits 桁数。1〜9 の整数。理由: truncation の結果は 31 bit で 10 桁に足りない
 * @param hash HMAC のハッシュ関数。既定は SHA-256
 * @throws {RangeError} digits が 1〜9 の整数でないとき
 * @throws {RangeError} key が空のとき。理由: env の設定漏れのまま動かさない
 * @example
 * await hmacDigits(secret, `event:${eventId}`, 8) // '01954405' のような 8 桁
 */
export const hmacDigits = async (
  key: string | Uint8Array,
  message: string | Uint8Array,
  digits: number,
  hash: 'SHA-1' | 'SHA-256' | 'SHA-512' = 'SHA-256',
): Promise<string> => {
  if (!Number.isInteger(digits) || digits < 1 || digits > 9) {
    throw new RangeError(`digits must be an integer 1-9: ${digits}`)
  }

  const mac = await hmacBytes(key, message, hash)

  const offset = mac[mac.length - 1] & 0x0f
  const binary = ((mac[offset] & 0x7f) << 24) |
    (mac[offset + 1] << 16) |
    (mac[offset + 2] << 8) |
    mac[offset + 3]

  return String(binary % 10 ** digits).padStart(digits, '0')
}
