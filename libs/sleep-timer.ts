/**
 * 指定ミリ秒だけ待機する Promise を返す
 *
 * @deprecated es-toolkit の `delay` へ移行 (drop-in 置換可)。docs/ADR-0001 参照
 * @example await sleepTimer(1000)
 */
export const sleepTimer = (milliseconds: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}
