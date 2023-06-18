/**
 * @example chunk([1, 2, 3, 4, 5, 6, 7], 3) // [[1, 2, 3], [4, 5, 6], [7]]
 * @link https://qiita.com/yarnaimo/items/e92600237d65876f8dd8
 */
export const chunk = <T>(arr: T[], size: number) => (
  arr.reduce((newarr, _, i) => (
    i % size ? newarr : [...newarr, arr.slice(i, i + size)]
  ), [] as T[][])
)
