import { assertEquals } from "https://deno.land/std@0.186.0/testing/asserts.ts"
import { isNumber } from "./src/is-number.ts"
import { error2json } from "./src/error2json.ts"

Deno.test('is-number', async test => {
  await test.step('string literal be fail', () => {
    assertEquals(isNumber('1'), false)
  })
  await test.step('number literal be true', () => {
    assertEquals(isNumber(1), true)
  })
})

Deno.test('error2json', () => {
  assertEquals(
    {
      ...JSON.parse(error2json(new Error('error'))),
      stack: 'dummy',
    },
    {
      name: 'Error',
      message: 'error',
      stack: 'dummy',
    },
  )
})
