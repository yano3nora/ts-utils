/**
 * 配列に重複する要素があるか検査する
 *
 * getKey を渡すと object の配列も「キーの重複」で判定できる。判定は Set
 * (SameValueZero 比較) による。
 *
 * @example
 * hasDuplicate([1, 2, 3]) // false
 * hasDuplicate([1, 2, 1]) // true
 * hasDuplicate(
 *   [{ id: 1, name: 'john' }, { id: 1, name: 'jane' }],
 *   (user) => user.id,
 * ) // true
 */
export function hasDuplicate<T, K>(
  values: readonly T[],
  getKey?: (value: T) => K,
): boolean {
  const seen = new Set<T | K>()

  for (const value of values) {
    const key = getKey ? getKey(value) : value

    if (seen.has(key)) {
      return true
    }

    seen.add(key)
  }

  return false
}
