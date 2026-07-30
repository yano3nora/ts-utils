/**
 * 線形合同法 (Linear Congruential Generator) による seed 決定的な乱数 generator
 *
 * Math.random と違い、同一 seed から常に同一の乱数列を再現できる。
 * テストや抽選結果の再現用 (es-toolkit の乱数系には無い機能)。
 * percentage を true にすると 0..1 の値を yield する。
 *
 * NOTE 暗号学的な強度はないため、セキュリティ用途には使わないこと
 *
 * @link https://en.wikipedia.org/wiki/Linear_congruential_generator
 * @example
 * const prng = LCG(123)
 * prng.next().value // 同一 seed から常に同一の値
 *
 * const percentages = LCG(123, true)
 * percentages.next().value // 0..1
 */
export const LCG = function* (
  seed: number,
  percentage?: boolean,
): Generator<number, never, unknown> {
  if (seed < 0) {
    throw new Error('seed should be positive number')
  }

  let prev = seed

  const a = 1664525
  const c = 1013904223
  const m = 2147483647 // 2^31 - 1

  while (true) {
    prev = (a * prev + c) % m
    yield percentage ? prev / m : prev
  }
}
