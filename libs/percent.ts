/**
 * @example
 * percent(200, 178)  // 200 の 178% → 356
 * percent(50, 120)   // 50 の 120% → 60
 */
export const percent = (value: number, percent: number): number => {
  return value * (percent / 100)
}
