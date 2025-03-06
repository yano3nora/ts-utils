// deno-lint-ignore-file
import { assertEquals } from 'https://deno.land/std@0.186.0/testing/asserts.ts'
import { safeGet } from './safe-get.ts'

Deno.test('safe-get', () => {
  const GENDER = { 1: '男性', 2: '女性' } as const
  const input = '1' as string | undefined
  const value1 = safeGet(GENDER, input)
  const value2 = safeGet(GENDER, input, 'default')
  assertEquals(value1, '男性') // '男性' | '女性' | undefined
  assertEquals(value2, '男性') // '男性' | '女性' | 'default'

  const OPTIONS = { 1: '男性', 2: '女性', valid: 999 } as const
  const inputs = [1, 2, 3, 'valid', 'invalid', null, undefined, '']
  const results = inputs.map((i) => safeGet(OPTIONS, i, null))

  assertEquals(
    results,
    [
      '男性',
      '女性',
      null,
      999,
      null,
      null,
      null,
      null,
    ],
  )

  // return undefined if no key
  assertEquals(
    safeGet(GENDER, 'invalid'),
    undefined,
  )

  // safe to use other than object
  assertEquals(
    safeGet(null, 'some-key'),
    undefined,
  )

  // safe to use to unknown
  assertEquals(
    safeGet({} as unknown, 'some-key'),
    undefined,
  )
})
