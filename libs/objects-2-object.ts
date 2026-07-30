/**
 * object の配列を、指定 field の値をキーにした object へ変換する
 *
 * @deprecated es-toolkit の `keyBy` へ移行 (docs/ADR-0001 参照)。
 *   objects2object(items, 'id') → keyBy(items, item => item.id)
 * @example
 * objects2object(
 *   [{ id: 1, name: 'john' }, { id: 2, name: 'jane' }],
 *   'id',
 * ) // { 1: { id: 1, name: 'john' }, 2: { id: 2, name: 'jane' } }
 */
export const objects2object = <T extends Record<string, unknown>>(
  objects: T[],
  keyField: keyof T,
): Record<string, T> => (
  objects.reduce<Record<string, T>>((obj, item) => {
    obj[String(item[keyField])] = item
    return obj
  }, {})
)
