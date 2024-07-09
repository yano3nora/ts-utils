import { char2codes } from './char-2-codes.ts'
import { LCG } from "./lcg.ts"

/**
 * @example randomInt(0, 10) // 0 ~ 10
 */
export const randomInt = (min: number, max: number, seed?: string) => {
  let maximum = max + 1

  min = Math.ceil(min)
  maximum = Math.floor(maximum)

  const prng = seed ? LCG(char2codes(seed), true) : undefined
  const algo = () => (
    prng
      ? prng.next().value
      : Math.random()
  )

  return Math.floor(algo() * (maximum - min) + min)
}
