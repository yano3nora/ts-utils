import { assertEquals } from 'https://deno.land/std@0.186.0/testing/asserts.ts'
import { missingElements } from './missing-elements.ts'

Deno.test('missing-elements', async test => {
  await test.step('strings', () => {
    const originalNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const partialNumbers = [1, 3, 4, 5]

    assertEquals(
      missingElements(originalNumbers, partialNumbers),
      [2, 6, 7, 8, 9, 10],
    )
  })

  await test.step('numbers', () => {
    const originalStrings = ['a', 'b', 'c', 'd', 'e', 'f']
    const partialStrings = ['a', 'c', 'd', 'e']

    assertEquals(
      missingElements(originalStrings, partialStrings),
      ['b', 'f'],
    )
  })
})
