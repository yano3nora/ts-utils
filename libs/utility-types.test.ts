// deno-lint-ignore-file no-explicit-any
import { assertEquals } from '@std/assert'
import type {
  DeepPartial,
  DeepPartialPick,
  NonEmptyArray,
} from './utility-types.ts'
import type { DeepNonNullable } from '../main.ts'

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

    // 3 階層目以降も再帰的に optional になる
    const nested: DeepPartial<{ a: { b: { c: number } } }> = { a: { b: {} } }

    // 配列プロパティは要素も DeepPartial になる
    const list: DeepPartial<{ items: { id: number }[] }> = { items: [{}] }

    assertEquals(u, {})
    assertEquals(nested, { a: { b: {} } })
    assertEquals(list, { items: [{}] })
  })

  await test.step('DeepPartial<any>', () => {
    // any のプロパティは any のまま残る。primitive も object も代入できる
    const n: DeepPartial<{ payload: any; type: string }> = { payload: 1 }
    const o: DeepPartial<{ payload: any; type: string }> = { payload: { a: 1 } }
    const a: DeepPartial<any> = 'any'

    assertEquals(n, { payload: 1 })
    assertEquals(o, { payload: { a: 1 } })
    assertEquals(a, 'any')
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
