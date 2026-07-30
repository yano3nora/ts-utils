/**
 * 書記素 (grapheme) 単位で文字数を数える
 *
 * String.prototype.length はサロゲートペア (𠮷 等) を 2 と数えてしまうため、
 * 「見た目どおりの文字数」が欲しいときに使う (Intl.Segmenter による)。
 *
 * @example
 * '𠮷野家'.length // 4 (サロゲートペアを 2 と数えてしまう)
 * charCount('𠮷野家') // 3
 */
export const charCount = (str: string): number => {
  // deno-lint-ignore ban-ts-comment
  // @ts-ignore
  const segmenter = new Intl.Segmenter('ja', { granularity: 'grapheme' })

  return [...segmenter.segment(str || '')].length
}
