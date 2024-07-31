// deno-lint-ignore-file no-explicit-any

/**
 * isNumber - 数値かどうかを検査する
 *
 * ## true
 * isNumber(0)
 * isNumber(1)
 * isNumber(-1)
 * isNumber(1.5)
 * isNumber(-1.5)
 *
 * ## false
 * isNumber(null)
 * isNumber(undefined)
 * isNumber(NaN)
 * isNumber('1')
 * isNumber(true)
 * isNumber(false)
 * isNumber(new Date())
 * isNumber(Infinity)
 * isNumber(-Infinity)
 * isNumber([])
 * isNumber({})
 * isNumber(Symbol('foo'))
 *
 * ### BigInt 未対応
 * isNumber(2n ** 53n) // false
 */
export const isNumber = (value: any): value is number => {
  return ((typeof value === 'number') && (isFinite(value)))
}
