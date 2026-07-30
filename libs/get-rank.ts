/**
 * 値の集合内での順位 (降順・1 始まり) を返す
 *
 * ランキング表示用。values を事前に sort しておく必要はなく、同値は
 * 同順位として扱う。
 *
 * @example
 * getRank([20, 23, 32, 34], 32) // 2
 * getRank([20, 23, 32, 34], 100) // 1
 */
export const getRank = (values: number[], value: number): number => {
  let order = 1
  for (let position = 0; position < values.length; position++) {
    if (values[position] > value && values[position] !== value) {
      order += 1
    }
  }

  return order
}
