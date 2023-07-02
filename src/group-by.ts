/**
 * @link https://qiita.com/nagtkk/items/e1cc3f929b61b1882bd1
 * @example
 * groupsBy(users, user => user.role)
 *   .forEach(([role, users]) => console.log(role, users))
 */
export const groupsBy = <K, V>(
  array: readonly V[],
  getKey: (cur: V, idx: number, src: readonly V[]) => K
): [K, V[]][] =>
  Array.from(
    array.reduce((map, cur, idx, src) => {
      const key = getKey(cur, idx, src)
      const list = map.get(key)

      if (list) {
        list.push(cur)
      } else {
        map.set(key, [cur])
      }

      return map
    }, new Map<K, V[]>())
  )

/**
 * @example
 * groupBy(users, user => user.role).admin // admin role users
 */
export const groupBy = <K extends PropertyKey, V>(
  array: readonly V[],
  getKey: (cur: V, idx: number, src: readonly V[]) => K
) => Object.fromEntries(groupsBy(array, getKey)) as Partial<Record<K, V[]>>
