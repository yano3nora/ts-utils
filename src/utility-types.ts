/**
 * @example
 * type User = {
 *   id: number
 *   name: string
 *   profile: {
 *     age: number
 *     email: string
 *   }
 * }
 *
 * type UserOptional = DeepPartial<User>
 * const u: UserOptional = {}
 */
export type DeepPartial<T> = {
  [P in keyof T]?: Partial<T[P]>
}

/**
 * @example
 * type User = {
 *   id: number
 *   name: string
 *   profile: {
 *     age: number
 *     email: string
 *   }
 * }
 *
 * type UserOptionalProfile = DeepPartialPick<User, 'id' | 'name'>
 * const u: UserOptionalProfile = { id: 1, name: 'john' }
 */
export type DeepPartialPick<T, K extends keyof T> = DeepPartial<T> & Pick<T, K>

/**
 * @example const numbers: NonEmptyArray<number> = [1]
 */
export type NonEmptyArray<T> = [T, ...T[]]
