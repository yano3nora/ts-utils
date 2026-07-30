import { assertEquals } from '@std/assert'
import { unionof } from './unionof.ts'

Deno.test('unionof', () => {
  type TestUnion = 'test1' | 'test2'

  assertEquals(
    unionof<TestUnion>('test1'),
    'test1',
  )
})
