/**
 * JSON.parse 可能な値かどうかを検査する
 *
 * NOTE es-toolkit の `isJSON` への移行を検討 (docs/ADR-0001 参照)。
 *      本実装は String() 強制するため非 string (例: 123) も true になるが、
 *      es-toolkit の isJSON は string 以外を常に false と判定するため
 *      安易に置換しないこと
 *
 * @example
 * isJson('{ "id": 1 }') // true
 * isJson('hoge') // false
 * isJson(123) // true (String() 強制のため)
 */
export const isJson = (json: unknown): boolean => {
  try {
    JSON.parse(String(json))
  } catch {
    return false
  }

  return true
}
