// deno-lint-ignore-file no-explicit-any

/**
 * object の値に target が含まれるか検査する (Array.prototype.includes の object 版)
 *
 * target には値そのもの、または value を受け取る述語関数を渡せる。
 *
 * NOTE 関数は常に述語として実行されるため、「関数そのものを値として検索する」
 *      ことはできない
 *
 * @example
 * const sample = { 1: 'hello', 2: 'world' }
 *
 * objectIncludes(sample, 'world') // true
 * objectIncludes(sample, 'foo') // false
 * objectIncludes(sample, (v) => String(v).startsWith('h')) // true
 */
export const objectIncludes = <T extends object>(
  obj: T,
  target: any | ((val: T[keyof T]) => boolean),
): boolean => (
  typeof target === 'function'
    ? Object.values(obj).some((value) =>
      (target as (val: T[keyof T]) => boolean)(value)
    )
    : Object.values(obj).includes(target)
)
