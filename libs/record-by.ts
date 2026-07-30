/**
 * object の配列を、getKey の返り値をキーにした Record<K, T> へ変換する
 *
 * @deprecated es-toolkit の `keyBy` へ移行 (docs/ADR-0001 参照)。
 *   引数順が逆: recordBy(getKey, items) → keyBy(items, getKey)
 * @example
 * type Keys = 1 | 2
 * const obj = recordBy<Keys, { id: Keys; name: string }>(
 *   (item) => item.id,
 *   [
 *     { id: 1, name: 'john' },
 *     { id: 2, name: 'jane' },
 *   ],
 * ) // { 1: { id: 1, name: 'john' }, 2: { id: 2, name: 'jane' } }
 *
 * obj[1].name // 'john'
 * obj[3].name // compile error
 */
export const recordBy = <
  K extends PropertyKey,
  T extends Record<PropertyKey, unknown>,
>(
  getKey: (item: T) => K,
  objects: T[],
): Record<K, T> => (
  objects.reduce((acm, item) => ({
    ...acm,
    [getKey(item)]: item,
  }), {} as Record<K, T>)
)
