import { assertEquals } from '@std/assert'
import { chunk } from './chunk.ts'

Deno.test('chunk', () => {
  assertEquals(
    chunk([1, 2, 3, 4, 5, 6, 7], 3),
    [[1, 2, 3], [4, 5, 6], [7]],
  )
})
