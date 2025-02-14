// deno-lint-ignore-file no-explicit-any

/**
 * @example
 * const GENDER = { 1: '男性', 2: '女性' }
 * const input = process.env.GENDER; // string | undefined
 * const value = safeGet(GENDER, input, 'default')
 * console.log(value) // '男性' or '女性' or 'default'
 */
export const safeGet = <
  T extends Record<PropertyKey, any>,
  K extends any,
  D,
>(
  obj: T,
  key: K,
  defaultValue?: D,
) => {
  if ((key as any) in obj) {
    return obj[key as keyof T]
  }

  return defaultValue
}
