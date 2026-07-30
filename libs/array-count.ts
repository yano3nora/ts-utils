/**
 * 配列内で target に一致する要素数を返す
 *
 * target には値そのもの、または述語関数を渡せる。es-toolkit の `countBy`
 * (キー別の集計 Record) とは別物で、こちらは単一条件のカウント用。
 *
 * NOTE 関数は常に述語として実行されるため、「関数そのものを値として数える」
 *      ことはできない
 *
 * @example
 * arrayCount([1, 2, 1, 3], 1) // 2
 * arrayCount([1, 2, 3, 4], (n) => n % 2 === 0) // 2
 */
export const arrayCount = <T>(
  array: T[],
  target: T | ((val: T) => boolean),
): number => (
  typeof target === 'function'
    ? array.filter(target as (val: T) => boolean).length
    : array.filter((v) => v === target).length
)
