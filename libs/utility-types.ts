/**
 * 全プロパティを再帰的に optional にする
 *
 * NOTE 配列プロパティにも再帰するため、要素も DeepPartial になり
 *      要素型へ undefined が加わる
 *
 * @example
 * type User = {
 *   id: number
 *   profile: {
 *     age: number
 *     contact: {
 *       email: string
 *     }
 *   }
 * }
 *
 * const u: DeepPartial<User> = {} // ok
 * const p: DeepPartial<User> = { profile: { contact: {} } } // 何階層でも ok
 */
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

/**
 * T 全体を {@linkcode DeepPartial} にしつつ、K のプロパティだけ必須で残す
 *
 * @example
 * type User = {
 *   id: number
 *   name: string
 *   profile: {
 *     age: number
 *   }
 * }
 *
 * const u: DeepPartialPick<User, 'id' | 'name'> = { id: 1, name: 'john' } // ok
 */
export type DeepPartialPick<T, K extends keyof T> = DeepPartial<T> & Pick<T, K>

/**
 * 空でないことを型で保証する配列
 *
 * @example
 * const numbers: NonEmptyArray<number> = [1] // ok
 * const empty: NonEmptyArray<number> = [] // compile error
 */
export type NonEmptyArray<T> = [T, ...T[]]

/**
 * プロパティから null / undefined を除去する (object プロパティは再帰)
 *
 * NOTE `null | { ... }` のような union 型のプロパティは NonNullable
 *      が適用されるのみで、その中身までは再帰されない
 *
 * @example
 * type User = {
 *   id: number
 *   profile: null | {
 *     name: string
 *   }
 * }
 *
 * const u: DeepNonNullable<User> = { id: 1, profile: null } // compile error
 */
export type DeepNonNullable<T> = {
  [P in keyof T]: T[P] extends object ? DeepNonNullable<T[P]>
    : NonNullable<T[P]>
}
