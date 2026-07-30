/** {@linkcode objectEntries} の戻り値型。key と value の対応を保った entries 型 */
export type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]

/**
 * 型推論の効く Object.entries
 *
 * 標準の Object.entries は [string, 値の union][] になり key と value
 * の対応が失われる。key ごとの value 型を保った tuple の union で返す wrapper。
 *
 * NOTE 意図的に unsound: T に無いキーが実行時に混ざっていても検出できない。
 *      また number key は型上 number のままだが実行時は string になり、
 *      symbol key は実行時に除外されるが型には残る
 *
 * @link https://stackoverflow.com/questions/60141960/typescript-key-value-relation-preserving-object-entries-type
 * @example
 * const user = { id: 1, name: 'john' }
 * objectEntries(user).forEach(([key, value]) => {
 *   // key は 'id' | 'name'、value は key に対応した型に narrow される
 * })
 */
export const objectEntries = <T extends object>(obj: T): Entries<T> =>
  Object.entries(obj) as Entries<T>
