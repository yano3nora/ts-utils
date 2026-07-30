import { objectKeys } from './object-keys.ts'

/**
 * value が一致するすべての key を返す ((keyof T)[] へ推論)
 *
 * 定数 object の逆引きを型付きで行うためのもの。最初の 1 件だけでよい場合は
 * {@linkcode objectKeyByValue} を使う。
 *
 * @example
 * objectKeysByValue({ one: 1, uno: 1, two: 2 }, 1) // ['one', 'uno']
 * objectKeysByValue({ one: 1, uno: 1, two: 2 }, 3) // []
 */
export const objectKeysByValue = <
  T extends Record<PropertyKey, U>,
  U = unknown,
>(object: T, value: U): (keyof T)[] => {
  return objectKeys(object).filter((key) => object[key] === value)
}
