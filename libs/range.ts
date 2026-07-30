import { isNumber } from './is-number.ts'

/**
 * 連番の数値配列を生成する
 *
 * number を渡すと 0 始まりの連番、{ min, max } を渡すと max を含む範囲の
 * 連番を返す。
 *
 * NOTE es-toolkit の `range` への移行を検討 (docs/ADR-0001 参照)。
 *      ただし end 排他の挙動差があるため安易に置換しないこと:
 *      range({ min: 1, max: 5 }) → range(1, 6)
 *
 * @example
 * range(5) // [0, 1, 2, 3, 4]
 * range({ min: 1, max: 5 }) // [1, 2, 3, 4, 5] (max を含む)
 */
export const range = (opt: number | { min: number; max: number }): number[] => {
  if (isNumber(opt)) {
    return [...Array(opt)].map((_, k) => k)
  }

  const { min, max } = opt

  return Array.from({ length: max - min + 1 }, (_, k) => k + min)
}
