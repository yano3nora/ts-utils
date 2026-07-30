/**
 * @deprecated es-toolkit の `uniq` へ移行 (drop-in 置換可)。docs/ADR-0001 参照
 * @example unique([1, 5, 3, 1, 5, 3]) // [1, 5, 3]
 */
export const unique = <T>(array: T[]) => [...new Set(array)]
