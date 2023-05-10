import { assertEquals } from 'https://deno.land/std@0.186.0/testing/asserts.ts'
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
