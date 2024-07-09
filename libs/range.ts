/**
 * @example range(5) // [ 0, 1, 2, 3, 4 ]
 */
export const range = (num: number) => [...Array(num)].map((_, k) => k)
