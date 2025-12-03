/**
 * @example
 *   objects2object(
 *     [ { id: 1, name: 'john' }, { id: 2, name: 'jane' } ],
 *     'id',
 *   ) // => { 1: { id: 1, name: 'john' }, 2: { id: 2, name: 'jane' } }
 *
 * @example
 * const _USERS = [
 *   { key: 'john', age: 35 },
 *   { key: 'jane', age: 28 },
 * ] as const
 *
 * export type UserKey = typeof _USERS[number]['key']
 * export type User = typeof _USERS[number]
 * export const USERS: Record<UserKey, User> = objects2object([..._USERS], 'key')
 */
export const objects2object = <T extends Record<string, unknown>>(
  objects: T[],
  keyField: keyof T,
) => (
  objects.reduce<Record<string, T>>((obj, item) => {
    obj[String(item[keyField])] = item
    return obj
  }, {})
)
