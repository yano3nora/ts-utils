export const LCG = function* (seed: number, percentage?: boolean) {
  if (seed < 0) {
    throw new Error('seed should be positive number')
  }

  let prev = seed

  // https://en.wikipedia.org/wiki/Linear_congruential_generator
  const a = 1664525
  const c = 1013904223
  const m = 2147483647 // 2^31 - 1

  while (true) {
    prev = (a * prev + c) % m
    yield percentage
      ? prev / m
      : prev
  }
}
