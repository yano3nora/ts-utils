import { assertEquals } from '@std/assert'
import { nameof } from './nameof.ts'

Deno.test('nameof', () => {
  type TestType = {
    someProp: string
  }

  assertEquals(
    nameof<TestType>('someProp'),
    'someProp',
  )
})
