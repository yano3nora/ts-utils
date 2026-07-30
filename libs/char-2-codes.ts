/**
 * 文字列を 32bit 正整数のハッシュ値へ変換する
 *
 * 文字列 seed から {@linkcode LCG} 等へ渡す数値 seed を作るためのもの。
 * 同一入力からは常に同一値が得られる。
 *
 * NOTE 暗号学的な強度はないため、セキュリティ用途には使わないこと
 *
 * @example
 * char2codes('seed') === char2codes('seed') // true
 * char2codes('seed') === char2codes('seeds') // false
 */
export const char2codes = (str: string): number => {
  let hash = 0

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash >>>= 0 // to 32 bit positive number
  }

  return hash
}
