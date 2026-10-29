/**
 * HMAC(key, message) のバイト列を返す
 *
 * {@linkcode hmacDigits} と {@linkcode hmacChars} の土台。
 * 計算は Web Crypto (`globalThis.crypto.subtle`) に任せる。
 *
 * NOTE Node 19 以上が必要。理由: それ未満は `globalThis.crypto` を標準で持たない
 *
 * @param key 秘密鍵。string は UTF-8 のバイト列にする
 * @param message 署名する値。string は UTF-8 のバイト列にする
 * @param hash HMAC のハッシュ関数。既定は SHA-256
 * @throws {RangeError} key が空のとき。理由: env の設定漏れのまま動かさない
 * @example
 * const mac = await hmacBytes('secret', 'message') // Uint8Array (32 bytes)
 */
export const hmacBytes = async (
  key: string | Uint8Array,
  message: string | Uint8Array,
  hash: 'SHA-1' | 'SHA-256' | 'SHA-512' = 'SHA-256',
): Promise<Uint8Array> => {
  const keyBytes = toBytes(key)

  if (keyBytes.length === 0) {
    throw new RangeError('key must not be empty')
  }

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyBytes,
    { name: 'HMAC', hash },
    false,
    ['sign'],
  )

  return new Uint8Array(
    await crypto.subtle.sign('HMAC', cryptoKey, toBytes(message)),
  )
}

// Uint8Array は複製して渡す。理由: TS 5.9 以降、ArrayBufferLike 由来の型は BufferSource に代入できない
const toBytes = (value: string | Uint8Array): Uint8Array<ArrayBuffer> =>
  typeof value === 'string'
    ? new TextEncoder().encode(value)
    : new Uint8Array(value)
