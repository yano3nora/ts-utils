/**
 * @example
 * type Keys = 1 | 2
 * const obj = recordBy<Keys, { id: Keys, name: string }>(
 *   item => item.id,
 *   [
 *     { id: 1, name: 'john' },
 *     { id: 2, name: 'jane' },
 *   ],
 * ) // => { 1: { id: 1, name: 'john' }, 2: { id: 2, name: 'jane' } }
 *
 * obj[1].name // john
 * obj[3].name // type error
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
