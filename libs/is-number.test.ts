import { assertEquals } from '@std/assert'
import { isNumber } from './is-number.ts'

Deno.test('is-number', async (test) => {
  await test.step('string literal be fail', () => {
    assertEquals(isNumber('1'), false)
  })
  await test.step('number literal be true', () => {
    assertEquals(isNumber(1), true)
  })
})
