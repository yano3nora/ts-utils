import { char2codes } from './char-2-codes.ts'
import { LCG } from './lcg.ts'

/**
 * seed 文字列から '{seed}-{乱数}' 形式の文字列を無限に yield する generator
 *
 * 同一 seed から常に同一の列が得られる ({@linkcode LCG} による)。
 * 再現可能なキー・ID の連番生成用。
 *
 * NOTE 暗号学的な強度はないため、セキュリティ用途には使わないこと
 *
 * @example
 * const gen = hashBySeed('user')
 * gen.next().value // 'user-1234567890' のような文字列 (同一 seed で再現可能)
 */
export const hashBySeed = function* (
  seed: string,
): Generator<string, never, unknown> {
  const prng = LCG(char2codes(seed))

  while (true) {
    yield `${seed}-${prng.next().value}`
  }
}
