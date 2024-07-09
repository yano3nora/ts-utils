import { assertEquals } from 'https://deno.land/std@0.186.0/testing/asserts.ts'
import { chunk } from './chunk.ts'

Deno.test('chunk', () => {
  assertEquals(
    chunk([1, 2, 3, 4, 5, 6, 7], 3),
    [[1, 2, 3], [4, 5, 6], [7]],
  )
})
