/**
 * @link https://stackoverflow.com/a/64456745/11565411
 * @example
 *   number2alphabets(0) // A
 *   number2alphabets(1) // B
 *   number2alphabets(25) // Z
 *   number2alphabets(26) // AA
 *   number2alphabets(27) // AB
 *   number2alphabets(51) // AZ
 *   number2alphabets(52) // BA
 *   number2alphabets(701) // ZZ
 *   number2alphabets(702) // AAA
 */
export const number2alphabets = (num: number) => {
  let alphabets = ''

  while (num >= 0) {
    alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[num % 26] + alphabets
    num = Math.floor(num / 26) - 1
  }

  return alphabets
}
