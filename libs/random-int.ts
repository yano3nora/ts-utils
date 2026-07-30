import { char2codes } from './char-2-codes.ts'
import { LCG } from './lcg.ts'

/**
 * min 以上 max 以下の整数乱数を返す
 *
 * seed 文字列を渡すと {@linkcode LCG} により同一 seed から同一結果を
 * 再現できる (es-toolkit の randomInt には無い機能。docs/ADR-0001 参照)。
 *
 * NOTE es-toolkit の randomInt は max 排他 (min 以上 max 未満) で挙動が異なる。
 *      seed に空文字を渡した場合は未指定と同様 Math.random になる
 *
 * @example
 * randomInt(0, 10) // 0 ~ 10 のいずれか (max を含む)
 * randomInt(0, 10, 'seed') // 同一 seed から常に同一の値
 */
export const randomInt = (min: number, max: number, seed?: string): number => {
  let maximum = max + 1

  min = Math.ceil(min)
  maximum = Math.floor(maximum)

  const prng = seed ? LCG(char2codes(seed), true) : undefined
  const algo = () => (
    prng ? prng.next().value : Math.random()
  )

  return Math.floor(algo() * (maximum - min) + min)
}
