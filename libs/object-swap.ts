/**
 * @deprecated es-toolkit の `invert` へ移行 (drop-in 置換可)。docs/ADR-0001 参照
 * @link https://ultimatecourses.com/blog/reverse-object-keys-and-values-in-javascript
 * @example
 *   const swapped = objectSwap({ x: 1, y: 2 }) // { 1: 'x', 2: 'y' }
 *         ^^^^^^^ infer Record<1 | 2, 'x' | 'y'>
 */
export const objectSwap = <
  T extends PropertyKey,
  U extends PropertyKey,
>(object: Record<T, U>) => Object.fromEntries(
  Object.entries(object).map(([key, value]) => [
    value,
    key,
  ]),
) as Record<U, T>
