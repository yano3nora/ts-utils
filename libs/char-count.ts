/**
 * @example
 * // ng
 * '𠮷野家'.length // 4
 *
 * // ok
 * charCount('𠮷野家') // 3
 */
export const charCount = (str: string): number => {
  // deno-lint-ignore ban-ts-comment
  // @ts-ignore
  const segmenter = new Intl.Segmenter('ja', { granularity: 'grapheme' })

  return [...segmenter.segment(str || '')].length
}
