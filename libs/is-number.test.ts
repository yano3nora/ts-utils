import { assertEquals } from 'https://deno.land/std@0.186.0/testing/asserts.ts'
import { isNumber } from './is-number.ts'

Deno.test('is-number', async test => {
  await test.step('string literal be fail', () => {
    assertEquals(isNumber('1'), false)
  })
  await test.step('number literal be true', () => {
    assertEquals(isNumber(1), true)
  })
})
