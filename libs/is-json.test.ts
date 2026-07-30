import { assertEquals } from '@std/assert'
import { isJson } from './is-json.ts'

Deno.test('is-json', async (test) => {
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
