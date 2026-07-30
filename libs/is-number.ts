// deno-lint-ignore-file no-explicit-any

/**
 * 有限の number かどうかを検査する type guard
 *
 * 「計算に使える数値か」の検査を意図しているため、typeof でなく isFinite
 * で判定する。
 *
 * NOTE es-toolkit の isNumber (typeof 判定で NaN / Infinity も true)
 *      とは意味論が異なるため置換しないこと (docs/ADR-0001 参照)
 *
 * @example
 * isNumber(1.5) // true
 * isNumber(-1) // true
 * isNumber('1') // false
 * isNumber(NaN) // false
 * isNumber(Infinity) // false
 * isNumber(2n ** 53n) // false (BigInt 未対応)
 */
export const isNumber = (value: any): value is number => {
  return ((typeof value === 'number') && (isFinite(value)))
}
