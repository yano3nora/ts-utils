import { LCG } from "./lcg.ts"
import { char2codes } from "./char-2-codes.ts"

export const hashBySeed = function* (seed: string) {
  const prng = LCG(char2codes(seed))

  while (true) {
    yield `${seed}-${prng.next().value}`
  }
}
