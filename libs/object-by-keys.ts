/**
 * @example
 *   objectByKeys([1, 2, 3])
 *   //=> { '1': undefined, '2': undefined, '3': undefined }
 *
 *   objectByKeys([1, 2, 3], 'initial')
 *   // => { '1': 'initial', '2': 'initial', '3': 'initial' }
 *
 *   objectByKeys([1, 2, 3], key => key * 10)
 *   // => { '1': 10, '2': 20, '3': 30 }
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries
 * @link https://zenn.dev/yano3nora/articles/cb00fad3b445c0
 */
export const objectByKeys = <T extends string | number | symbol, U = undefined>(
  keys: T[],
  initial?: U | ((key: T) => U),
): Record<T, U> =>
  Object.fromEntries([
    ...keys.map((key) => [
      key,
      initial instanceof Function ? initial(key) : initial,
    ]),
  ])
