import { char2codes } from './char-2-codes.ts'
import { LCG } from './lcg.ts'

/**
 * 配列をシャッフルした新規配列を返す (Fisher–Yates)
 *
 * options.seed で同一 seed からの結果再現、options.pick でシャッフル後の
 * 先頭 n 件の抽出ができる (es-toolkit の shuffle には無い機能。docs/ADR-0001
 * 参照)。抽選の再現やテストデータ生成に使う。
 *
 * NOTE seed の空文字・pick の 0 は falsy のため未指定と同様に扱う
 *      (pick: 0 は空配列でなく全件を返す)
 *
 * @link https://ja.javascript.info/task/shuffle
 * @example
 * shuffled([1, 2, 3, 4, 5]) // 例: [3, 1, 5, 2, 4]
 * shuffled([1, 2, 3, 4, 5], { seed: 'abc' }) // 同一 seed から常に同一の並び
 * shuffled([1, 2, 3, 4, 5], { pick: 2 }) // シャッフル後の先頭 2 件
 */
export const shuffled = <T>(
  array: T[],
  options?: { pick?: number; seed?: string },
): T[] => {
  const shuffled = array.slice()
  const { pick, seed } = options || {}
  const prng = seed ? LCG(char2codes(seed), true) : undefined
  const algo = () => (
    prng ? prng.next().value : Math.random()
  )

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(algo() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  if (!pick) {
    return shuffled
  }

  return shuffled.slice(0, pick)
}
