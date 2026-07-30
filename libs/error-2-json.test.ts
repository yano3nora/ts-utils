import { assertEquals } from '@std/assert'
import { error2json } from './error-2-json.ts'

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
