// deno-lint-ignore-file no-explicit-any

/**
 * @exmaple
 * const sample = { 1: 'hello', 2: 'world', 3: [1, 2, 3] }
 *
 * objectIncludes(sample, 'world')) // true
 * objectIncludes(sample, 'foo'))   // false
 * objectIncludes(sample, (v: any) => String(v).startsWith('h')) // true
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
