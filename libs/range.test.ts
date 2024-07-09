import { assertEquals } from 'https://deno.land/std@0.186.0/testing/asserts.ts'
import { range } from './range.ts'

Deno.test('range', () => {
  assertEquals(
    range(5),
    [0, 1, 2, 3, 4],
  )
})
