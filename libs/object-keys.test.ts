import { assertEquals } from 'https://deno.land/std@0.186.0/testing/asserts.ts'
import { objectKeys } from './object-keys.ts'

Deno.test('object-keys', async (test) => {
  await test.step('string keys', () => {
    const users = {
      john: { id: 1, name: 'john', age: 18 },
      jane: { id: 2, name: 'jane', age: 18 },
      bob: { id: 3, name: 'bob', age: 18 },
    }

    assertEquals(
      objectKeys(users),
      ['john', 'jane', 'bob'],
    )
  })

  await test.step('number keys casted string', () => {
    const users = {
      1: { id: 1, name: 'john', age: 18 },
      2: { id: 2, name: 'jane', age: 18 },
      3: { id: 3, name: 'bob', age: 18 },
    }

    assertEquals(
      objectKeys(users),
      // deno-lint-ignore no-explicit-any
      ['1', '2', '3'] as any,
    )
  })
})
