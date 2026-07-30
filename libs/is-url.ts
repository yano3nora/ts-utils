/**
 * URL としてパース可能な文字列かどうかを検査する (new URL による)
 *
 * NOTE protocol 付きの絶対 URL のみ true になる ('example.com' は false)
 *
 * @example
 * isUrl('https://example.com') // true
 * isUrl('example.com') // false
 */
export const isUrl = (str: string): boolean => {
  try {
    new URL(str).toString()
  } catch {
    return false
  }

  return true
}
