/**
 * @example await sleepTimer(1000)
 */
export const sleepTimer = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}
