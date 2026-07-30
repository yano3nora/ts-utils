/**
 * 配列を指定サイズごとの二次元配列に分割する
 *
 * @deprecated es-toolkit の `chunk` へ移行 (drop-in 置換可)。docs/ADR-0001 参照
 * @link https://qiita.com/yarnaimo/items/e92600237d65876f8dd8
 * @example chunk([1, 2, 3, 4, 5, 6, 7], 3) // [[1, 2, 3], [4, 5, 6], [7]]
 */
export const chunk = <T>(arr: T[], size: number): T[][] => (
  arr.reduce((newarr, _, i) => (
    i % size ? newarr : [...newarr, arr.slice(i, i + size)]
  ), [] as T[][])
)
