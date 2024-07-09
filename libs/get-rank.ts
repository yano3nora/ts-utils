/**
 * @example getRank([20, 23, 32, 34], 32) // 2
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
