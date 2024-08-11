import { assertEquals } from 'https://deno.land/std@0.186.0/testing/asserts.ts'
import { DeepPartial, DeepPartialPick, NonEmptyArray } from './utility-types.ts'
import { DeepNonNullable } from '../main.ts'

Deno.test('utility-types', async (test) => {
  type User = {
    id: number
    name: string
    profile: {
      age: number
      email: string
    }
  }

  type NullableUser = {
    id: number
    profile: null | {
      name: string
      age: number
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

  await test.step('DeepNonNullable', () => {
    const u1: NullableUser = { id: 1, profile: null }
    const u2: NonNullable<NullableUser> = { id: 1, profile: null }
    const u3: DeepNonNullable<NullableUser> = {
      id: 1,
      profile: { age: 1, name: '' },
    }

    assertEquals(u1, { id: 1, profile: null })
    assertEquals(u2, { id: 1, profile: null })
    assertEquals(u3, { id: 1, profile: { age: 1, name: '' } })
  })
})
