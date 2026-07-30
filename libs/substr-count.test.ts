import { assertEquals } from '@std/assert'
import { substrCount } from './substr-count.ts'

Deno.test('substrCount', () => {
  assertEquals(substrCount('テストですテストテス', 'テス'), 3)
  assertEquals(substrCount('hello', 'l'), 2)
  assertEquals(substrCount('hello', 'x'), 0)
  assertEquals(substrCount('', 'x'), 0)
  assertEquals(substrCount('hello', ''), 0)

  // 重なり合う出現は数えない
  assertEquals(substrCount('aaa', 'aa'), 1)
})
