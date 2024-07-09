import { assertEquals } from 'https://deno.land/std@0.186.0/testing/asserts.ts'
import { objectKeysByValue } from './object-keys-by-value.ts'

Deno.test('object-keys-by-value', async test => {
  await test.step('case of undefined', () => {
    const obj = { one: 1, first: 1, two: 2 }

    assertEquals(
      objectKeysByValue(obj, 3),
      [],
    )
  })

  await test.step('case of exists', () => {
    const obj = { one: 1, first: 1, two: 2 }

    assertEquals(
      objectKeysByValue(obj, 1),
      ['one', 'first'],
    )
  })
})
