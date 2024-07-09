import { assertEquals } from 'https://deno.land/std@0.186.0/testing/asserts.ts'
import { unique } from './unique.ts'

Deno.test('unique', () => {
  assertEquals(
    unique([1, 5, 3, 1, 5, 3, 4]),
    [1, 5, 3, 4],
  )
})
