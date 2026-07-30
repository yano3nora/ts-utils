/**
 * original のうち partials に含まれない要素を返す (差集合)
 *
 * @deprecated es-toolkit の `difference` へ移行 (drop-in 置換可)。docs/ADR-0001 参照
 * @example
 * missingElements([1, 2, 3, 4, 5], [1, 3, 4]) // [2, 5]
 * missingElements(['a', 'b', 'c'], ['a', 'c']) // ['b']
 */
export const missingElements = <T>(original: T[], partials: T[]): T[] => {
  const partialsSet = new Set(partials)
  return original.filter((element) => !partialsSet.has(element))
}
