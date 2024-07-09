/**
 * type inferable Object.keys
 *
 * NOTE key が number な型定義だと number[] になりつつ
 *      「 js の object key は全て string 」という仕様で
 *      string[] になるので、後続で map(Number) など必要
 */
export const objectKeys = <T extends Record<string, unknown>>(
  target: T,
): (keyof T)[] => Object.keys(target).map((key) => key as keyof T)
