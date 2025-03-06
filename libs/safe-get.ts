// deno-lint-ignore-file

/**
 * @example
 * const GENDER = { 1: '男性', 2: '女性' } as const
 * const input = process.env.GENDER; // string | undefined
 * const value1 = safeGet(GENDER, input)
 * const value2 = safeGet(GENDER, input, 'default')
 *
 * console.log(value1) // '男性' | '女性' | undefined
 * console.log(value2) // '男性' | '女性' | 'default'
 */
export function safeGet<
  T extends Record<PropertyKey, unknown> | unknown,
  D = undefined,
>(
  obj: T,
  key: PropertyKey | undefined | null,
  defaultValue?: D,
): D extends undefined ? (T[keyof T] | undefined)
  : (T[keyof T] | D) {
  if (!obj || typeof obj !== 'object') {
    return defaultValue as any
  }

  if (key == null) {
    return defaultValue as any
  }

  if (key in obj) {
    return (obj as any)[key]
  }

  return defaultValue as any
}
