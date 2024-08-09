import { assertEquals } from 'https://deno.land/std@0.186.0/testing/asserts.ts'
import { range } from './range.ts'

Deno.test('range', async test => {
  await test.step('simple array', () => {
    assertEquals(
      range(0),
      [],
    )
    assertEquals(
      range(1),
      [0],
    )
    assertEquals(
      range(5),
      [0, 1, 2, 3, 4],
    )
  })

  await test.step('passed min & max', () => {
    assertEquals(
      range({ min: 1, max: 5 }),
      [1, 2, 3, 4, 5],
    )
    assertEquals(
      range({ min: 0, max: 5 }),
      [0, 1, 2, 3, 4, 5],
    )
    assertEquals(
      range({ min: 0, max: 0 }),
      [0],
    )
    assertEquals(
      range({ min: 1, max: 0 }),
      [],
    )
    assertEquals(
      range({ min: -5, max: 0 }),
      [-5, -4, -3, -2, -1, 0],
    )
  })
})
