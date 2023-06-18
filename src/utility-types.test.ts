import { assertEquals } from 'https://deno.land/std@0.186.0/testing/asserts.ts'
import { DeepPartial, DeepPartialPick, NonEmptyArray } from './utility-types.ts'

Deno.test('utility-types', async (test) => {
  type User = {
    id: number
    name: string
    profile: {
      age: number
      email: string
    }
  }

  await test.step('DeepPartial', () => {
    const u: DeepPartial<User> = {}
    assertEquals(u, {})
  })

  await test.step('DeepPartialPick', () => {
    const u: DeepPartialPick<User, 'id' | 'name'> = { id: 1, name: 'john' }
    assertEquals(u, { id: 1, name: 'john' })
  })

  await test.step('NonEmptyArray', () => {
    const numbers: NonEmptyArray<number> = [1]
    assertEquals(numbers, [1])
  })
})
