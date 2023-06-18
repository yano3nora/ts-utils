/**
 * @example
 *   objects2object(
 *     [ { id: 1, name: 'john' }, { id: 2, name: 'jane' } ],
 *     'id',
 *   ) // => { 1: { id: 1, name: 'john' }, 2: { id: 2, name: 'jane' } }
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
