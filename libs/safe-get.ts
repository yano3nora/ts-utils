// deno-lint-ignore-file

/**
 * 未検証のキーで object を安全に引く (値の union へ推論)
 *
 * 環境変数やユーザー入力のような string | undefined を、定数 object
 * のキーとして型安全に扱うためのもの。キーが存在しない・obj が object
 * でない場合は defaultValue (未指定なら undefined) を返す。
 *
 * @example
 * const GENDER = { 1: '男性', 2: '女性' } as const
 * const input = process.env.GENDER // string | undefined
 *
 * safeGet(GENDER, input) // '男性' | '女性' | undefined
 * safeGet(GENDER, input, 'default') // '男性' | '女性' | 'default'
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
