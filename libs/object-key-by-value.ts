import { objectKeys } from './object-keys.ts'

/**
 * @example
 * const obj = { one: 1 }
 * const key = objectKeyByValue(obj, 1) // 'one' | undefined
 */
export const objectKeyByValue = <
  T extends Record<PropertyKey, U>,
  U = unknown
>(object: T, value: U) => {
  return objectKeys(object).find(key => object[key] === value)
}
