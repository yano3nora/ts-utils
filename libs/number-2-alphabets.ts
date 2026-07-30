/**
 * 0 始まりの数値を A, B, ..., Z, AA, AB, ... のアルファベット列へ変換する
 *
 * スプレッドシートの列名のような連番ラベルの生成用。
 *
 * @link https://stackoverflow.com/a/64456745/11565411
 * @example
 * number2alphabets(0) // 'A'
 * number2alphabets(25) // 'Z'
 * number2alphabets(26) // 'AA'
 * number2alphabets(702) // 'AAA'
 */
export const number2alphabets = (num: number): string => {
  let alphabets = ''

  while (num >= 0) {
    alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[num % 26] + alphabets
    num = Math.floor(num / 26) - 1
  }

  return alphabets
}
