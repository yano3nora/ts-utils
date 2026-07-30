import { assertEquals } from '@std/assert'
import { charCount } from './char-count.ts'

Deno.test('char-count', () => {
  assertEquals(
    charCount('test'),
    4,
  )
  assertEquals(
    charCount('あいうえお'),
    5,
  )
  assertEquals(
    charCount('吉野家'),
    3,
  )
  assertEquals(
    '𠮷野家'.length,
    4,
  )
  assertEquals(
    charCount('𠮷野家'),
    3,
  )
})
