/**
 * 型推論の効く Object.keys
 *
 * 標準の Object.keys は型健全性の都合で string[] を返すため、keyof T
 * のまま扱いたい業務コードでは毎回キャストが必要になる。それを肩代わりする
 * wrapper。
 *
 * NOTE 意図的に unsound: T に無いキーが実行時に混ざっていても検出できない。
 *      また number key の型定義でも js の仕様上キーは常に string になるため、
 *      数値として使うなら後続で map(Number) 等が必要
 *
 * @example
 * const user = { id: 1, name: 'john' }
 * const keys = objectKeys(user) // ('id' | 'name')[]
 */
export const objectKeys = <T extends Record<string, unknown>>(
  target: T,
): (keyof T)[] => Object.keys(target).map((key) => key as keyof T)
