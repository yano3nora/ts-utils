import { assertEquals } from 'https://deno.land/std@0.186.0/testing/asserts.ts'
import { unionof } from './unionof.ts'

Deno.test('unionof', () => {
  type TestUnion = 'test1' | 'test2'

  assertEquals(
    unionof<TestUnion>('test1'),
    'test1',
  )
})
