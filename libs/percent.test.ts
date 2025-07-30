import { assertEquals } from 'https://deno.land/std@0.186.0/testing/asserts.ts'
import { percent } from './percent.ts'

Deno.test('percent', () => {
  assertEquals(
    percent(999, 100),
    999,
  )
  assertEquals(
    percent(500, 0),
    0,
  )
  assertEquals(
    percent(500, 50),
    250,
  )
  assertEquals(
    percent(500, -1),
    -5,
  )
  assertEquals(
    percent(500, 101),
    505,
  )
  assertEquals(
    percent(333, 87),
    289.71,
  )
  assertEquals(
    percent(200, 178),
    356,
  )
  assertEquals(
    percent(50, 120),
    60,
  )
})
