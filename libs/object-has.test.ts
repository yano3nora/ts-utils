import { assert, assertEquals, assertFalse } from '@std/assert'
import { objectHas } from './object-has.ts'

Deno.test('objectHas', () => {
  const target = { hello: 'world', 1: 'one' }

  assert(objectHas(target, 'hello'))
  assert(objectHas(target, 1))
  assertFalse(objectHas(target, 'notExists'))

  // 継承 prop は Object.hasOwn 同様 false
  assertFalse(objectHas(target, 'toString'))

  // 未設定の optional property も false (keyof T ではあるが own key でない)
  const partial: { a: number; b?: number } = { a: 1 }
  assertFalse(objectHas(partial, 'b'))

  // narrow の確認: true 側では keyof target として index アクセスできる
  const key: string = 'hello'
  if (objectHas(target, key)) {
    assertEquals(target[key], 'world')
  }
})
