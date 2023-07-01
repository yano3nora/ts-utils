import { assertEquals } from 'https://deno.land/std@0.186.0/testing/asserts.ts'
import { objectKeyByValue } from './object-key-by-value.ts'

Deno.test('object-key-by-value', async test => {
  await test.step('case of undefined', () => {
    const obj = { one: 1 }

    assertEquals(
      objectKeyByValue(obj, 2),
      undefined,
    )
  })

  await test.step('case of exists', () => {
    const obj = { one: 1 }

    assertEquals(
      objectKeyByValue(obj, 1),
      'one',
    )
  })
})
