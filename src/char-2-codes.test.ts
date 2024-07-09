import { assertEquals } from 'https://deno.land/std@0.186.0/testing/asserts.ts'
import { char2codes } from './char-2-codes.ts'

Deno.test('char-2-codes', () => {
  assertEquals(
    char2codes('TEST'),
    2571410,
  )

  assertEquals(
    char2codes('TEST'),
    2571410,
  )

  assertEquals(
    char2codes('TEST'),
    2571410,
  )

  assertEquals(
    char2codes('TEST?'),
    79713773,
  )

  assertEquals(
    char2codes('cly6xgcv40000nj5nfbkao546'),
    1437815003,
  )
})
