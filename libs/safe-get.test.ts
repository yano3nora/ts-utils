import { assertEquals } from 'https://deno.land/std@0.186.0/testing/asserts.ts'
import { safeGet } from './safe-get.ts'

Deno.test('record-by', () => {
  const GENDER = { 1: '男性', 2: '女性', valid: 999 }
  const inputs = [1, 2, 3, 'valid', 'invalid', null, undefined, '']
  const results = inputs.map((i) => safeGet(GENDER, i, null))

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

  assertEquals(
    safeGet(GENDER, 'invalid'),
    undefined,
  )
})
