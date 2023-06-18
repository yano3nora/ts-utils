/**
 * @example randomInt(0, 10) // 0 ~ 10
 */
export const randomInt = (min: number, max: number) => {
  let maximum = max + 1

  min = Math.ceil(min)
  maximum = Math.floor(maximum)

  return Math.floor(Math.random() * (maximum - min) + min)
}
