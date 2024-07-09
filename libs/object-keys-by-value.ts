import { objectKeys } from './object-keys.ts'

/**
 * @example
 * const obj = { one: 1, two: 2 }
 * const key = objectKeysByValue(obj, 1) // ['one']
 */
export const objectKeysByValue = <
  T extends Record<PropertyKey, U>,
  U = unknown
>(object: T, value: U) => {
  return objectKeys(object).filter(key => object[key] === value)
}
