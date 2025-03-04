export const arrayCount = <T>(
  array: T[],
  target: T | ((val: T) => boolean),
) => (
  typeof target === 'function'
    ? array.filter(target as (val: T) => boolean).length
    : array.filter((v) => v === target).length
)
