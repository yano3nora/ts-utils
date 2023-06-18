import { assertEquals } from 'https://deno.land/std@0.186.0/testing/asserts.ts'
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
