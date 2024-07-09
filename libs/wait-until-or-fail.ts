/**
 * @example
 *
 * try {
 *   await waitUntilOrFail(() => getState().someState === 'ok')
 *   // do something
 * } catch {
 *   // timeout
 * }
 *
 * @link https://levelup.gitconnected.com/javascript-wait-until-something-happens-or-timeout-82636839ea93
 */
export const waitUntilOrFail = (
  condition: () => boolean,
  options?: {
    timeoutMillis?: number
    intervalMillis?: number
  },
) => {
  return new Promise<void>((resolve, reject) => {
    const current = () => new Date().getTime()
    const started = current()
    const timeout = started + (options?.timeoutMillis || 5000)

    const timer = setInterval(() => {
      if (condition()) {
        clearInterval(timer)
        resolve()
      } else if (current() >= timeout) {
        clearInterval(timer)
        reject(Error(`TIMEOUT (from ${started} / current ${current()})`))
      }
    }, options?.intervalMillis || 100)
  })
}
