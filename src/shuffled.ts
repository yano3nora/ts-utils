/**
 * 配列の中身をシャッフルして新規配列を返す
 * @see https://ja.javascript.info/task/shuffle
 */
export const shuffled = <T>(array: T[], amount?: number) => {
  const shuffled = array.slice()

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  if (!amount) {
    return shuffled
  }

  return shuffled.slice(0, amount)
}
