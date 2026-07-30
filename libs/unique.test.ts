import { assertEquals } from '@std/assert'
import { unique } from './unique.ts'

Deno.test('unique', () => {
  assertEquals(
    unique([1, 5, 3, 1, 5, 3, 4]),
    [1, 5, 3, 4],
  )
})
