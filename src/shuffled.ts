import { LCG } from "./lcg.ts"
import { char2codes } from "./char-2-codes.ts"

/**
 * 配列の中身をシャッフルして新規配列を返す
 *
 * @param {array} array - 元の配列
 * @param {object|undefined} options
 * @param {number|undefined} options.pick - shuffled から pick 分だけ抽出
 * @param {string|undefined} options.seed - 同一 seed から同一結果を再現させる
 * @see https://ja.javascript.info/task/shuffle
 */
export const shuffled = <T>(
  array: T[],
  options?: { pick?: number, seed?: string }
) => {
  const shuffled = array.slice()
  const { pick, seed } = options || {}
  const prng = seed ? LCG(char2codes(seed)) : undefined
  const algo = () => (
    prng
      ? prng.next().value
      : Math.random()
  )

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(algo() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  if (!pick) {
    return shuffled
  }

  return shuffled.slice(0, pick)
}
