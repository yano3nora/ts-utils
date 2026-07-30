/**
 * value の percent % にあたる値を返す
 *
 * @example
 * percent(200, 178) // 356 (200 の 178%)
 * percent(50, 120) // 60 (50 の 120%)
 */
export const percent = (value: number, percent: number): number => {
  return value * (percent / 100)
}
