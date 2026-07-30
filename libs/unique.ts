/**
 * 配列から重複を除いた新規配列を返す (Set ベース、順序維持)
 *
 * @deprecated es-toolkit の `uniq` へ移行 (drop-in 置換可)。docs/ADR-0001 参照
 * @example unique([1, 5, 3, 1, 5, 3]) // [1, 5, 3]
 */
export const unique = <T>(array: T[]): T[] => [...new Set(array)]
