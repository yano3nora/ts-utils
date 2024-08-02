import { assertEquals } from 'https://deno.land/std@0.186.0/testing/asserts.ts'
import { isJson } from './is-json.ts'

Deno.test('is-json', async test => {
  await test.step('valid json', () => {
    const validJson = JSON.stringify({ hello: 'world' })

    assertEquals(
      isJson(validJson),
      true,
    )
  })

  await test.step('invalid json', () => {
    const invalidJson = 'not json'

    assertEquals(
      isJson(invalidJson),
      false,
    )
  })
})
