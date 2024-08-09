import { isNumber } from './is-number.ts'

/**
 * @example
 * range(5) // [ 0, 1, 2, 3, 4 ]
 * range({ min: 1, max: 5 }) // [1, 2, 3, 4, 5]
 */
export const range = (opt: number | { min: number, max: number }) => {
  if (isNumber(opt)) {
    return [...Array(opt)].map((_, k) => k)
  }

  const { min, max } = opt

  return Array.from({ length: (max - min + 1) }, (_, k) => k + min)
}
