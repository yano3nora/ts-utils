/**
 * union type のメンバーであることを型検査しつつ、その文字列を返す
 *
 * リテラル union のメンバー名をマジックストリングで書かないためのもの
 * ({@linkcode nameof} の union 版)。
 *
 * @example
 * type Status = 'active' | 'inactive'
 * unionof<Status>('active') // 'active'
 * unionof<Status>('notExists') // compile error
 */
export const unionof = <T>(name: Extract<T, string>): string => name
