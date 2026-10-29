import { hmacBytes } from './hmac-bytes.ts'

/**
 * Crockford base32 の文字集合。0/O、1/I/L、U を除く
 *
 * @link https://www.crockford.com/base32.html
 */
export const CROCKFORD_BASE32 = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'

/**
 * HMAC(key, message) を length 文字の文字列にする
 *
 * 秘密鍵を知る人だけが計算できる、恒常的なパスワードやコードの生成用。
 * 1 文字あたり log2(alphabet.length) bit の強さになる。
 * 既定の 32 文字で 8 文字なら 40 bit (約 1 兆通り)。
 * HMAC のバイトを alphabet の長さで割った余りで文字を選ぶ。
 *
 * NOTE 人が目視や口頭で伝える短い数字が要るなら {@linkcode hmacDigits} を使う
 * NOTE alphabet の長さは 256 の約数 (2, 4, 8, 16, 32, 64, 128, 256) に限る。
 *      理由: 余りで選ぶとき、文字の出現確率に偏りを出さない
 * NOTE 同じ key と message からは、常に同じ値を返す
 * NOTE 照合・試行回数の制限・期限の管理は、呼び出し側で行う
 * NOTE 1 つの秘密鍵を複数の用途で使うときは、message の頭に用途ごとの文字列を付ける
 *      (例: `page:`)。理由: 用途の間で値を計算し合えないようにする
 * NOTE Node 19 以上が必要。理由: それ未満は `globalThis.crypto` を標準で持たない
 *
 * @param key 秘密鍵。string は UTF-8 のバイト列にする
 * @param message 署名する値。string は UTF-8 のバイト列にする
 * @param length 文字数。1 以上で、hash のバイト数 (SHA-256 なら 32) 以下
 * @param alphabet 使う文字の集合。既定は Crockford base32
 * @param hash HMAC のハッシュ関数。既定は SHA-256
 * @throws {RangeError} length が範囲外のとき
 * @throws {RangeError} alphabet の長さが 256 の約数でないとき。または文字が重複するとき
 * @throws {RangeError} key が空のとき。理由: env の設定漏れのまま動かさない
 * @example
 * await hmacChars(secret, `page:${eventId}`, 8) // 'K7Q2XH9M' のような 8 文字
 */
export const hmacChars = async (
  key: string | Uint8Array,
  message: string | Uint8Array,
  length: number,
  alphabet: string = CROCKFORD_BASE32,
  hash: 'SHA-1' | 'SHA-256' | 'SHA-512' = 'SHA-256',
): Promise<string> => {
  const chars = [...alphabet]

  if (
    chars.length < 2 ||
    256 % chars.length !== 0 ||
    new Set(chars).size !== chars.length
  ) {
    throw new RangeError(
      `alphabet must have unique chars and a length dividing 256: ${alphabet}`,
    )
  }

  const mac = await hmacBytes(key, message, hash)

  if (!Number.isInteger(length) || length < 1 || length > mac.length) {
    throw new RangeError(`length must be an integer 1-${mac.length}: ${length}`)
  }

  return Array.from(mac.subarray(0, length), (b) => chars[b % chars.length])
    .join('')
}
