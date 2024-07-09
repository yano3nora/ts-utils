/**
 * @example
 * const originalNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * const partialNumbers = [1, 3, 4, 5]
 * console.log(missingElements(originalNumbers, partialNumbers)) // [2, 6, 7, 8, 9, 10]
 *
 * const originalStrings = ['a', 'b', 'c', 'd', 'e', 'f']
 * const partialStrings = ['a', 'c', 'd', 'e']
 * console.log(missingElements(originalStrings, partialStrings)) // ['b', 'f']
 */
export const missingElements = <T>(original: T[], partials: T[]): T[] => {
  const partialsSet = new Set(partials)
  return original.filter(element => !partialsSet.has(element))
}
