/**
 * unionof - union type の型照合しつつ string 返すやつ
 *
 * @example unionof<'hoge'|'fuga'>('hoge') // 'hoge'
 * @example unionof<'hoge'|'fuga'>('notExistsLiteral') // compile error
 */
export const unionof = <T>(name: Extract<T, string>): string => name
