/**
 * @example unique([1, 5, 3, 1, 5, 3]) // [1, 5, 3]
 */
export const unique = <T>(array: T[]) => [...new Set(array)]
