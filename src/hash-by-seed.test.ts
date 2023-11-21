import { assertEquals } from 'https://deno.land/std@0.186.0/testing/asserts.ts'
import { hashBySeed } from './hash-by-seed.ts'

Deno.test('hash-by-seed', async test => {
  await test.step('returns same hashes from same seed', () => {
    const seed = 'test'
    const generator1 = hashBySeed(seed)
    const generator2 = hashBySeed(seed)

    const hashes1 = [0, 1, 2].map(() => generator1.next().value)
    const hashes2 = [0, 1, 2].map(() => generator2.next().value)

    assertEquals(
      hashes1,
      hashes2,
    )
  })

  await test.step('returns another hashes from another seed', () => {
    const generator1 = hashBySeed('seed1')
    const generator2 = hashBySeed('seed2')

    const hashes1 = [0, 1, 2].map(() => generator1.next().value)
    const hashes2 = [0, 1, 2].map(() => generator2.next().value)

    assertEquals(
      hashes1.every(hash => !hashes2.includes(hash)),
      true,
    )
  })
})
