import { objectKeys } from './object-keys.ts'

/**
 * value が一致する最初の key を返す (keyof T へ推論)
 *
 * 定数 object の逆引きを型付きで行うためのもの。複数一致し得る場合は
 * {@linkcode objectKeysByValue} を使う。
 *
 * @example
 * objectKeyByValue({ one: 1, two: 2 }, 1) // 'one' ('one' | 'two' | undefined へ推論)
 * objectKeyByValue({ one: 1, two: 2 }, 3) // undefined
 */
export const objectKeyByValue = <
  T extends Record<PropertyKey, U>,
  U = unknown,
>(object: T, value: U): keyof T | undefined => {
  return objectKeys(object).find((key) => object[key] === value)
}
