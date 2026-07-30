/**
 * condition が true になるまでポーリングして待機する Promise を返す
 *
 * store や外部システムなど、自前で await できない状態変化を待つためのもの。
 * timeoutMillis (default 5000) を超えると reject する。
 *
 * @link https://levelup.gitconnected.com/javascript-wait-until-something-happens-or-timeout-82636839ea93
 * @example
 * try {
 *   await waitUntilOrFail(() => getState().someState === 'ok')
 *   // 条件成立後の処理
 * } catch {
 *   // timeout
 * }
 */
export const waitUntilOrFail = (
  condition: () => boolean,
  options?: {
    /** timeout までのミリ秒 (default 5000) */
    timeoutMillis?: number
    /** ポーリング間隔のミリ秒 (default 100) */
    intervalMillis?: number
  },
): Promise<void> => {
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
