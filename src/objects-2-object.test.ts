import { assertEquals } from 'https://deno.land/std@0.186.0/testing/asserts.ts'
import { objects2object } from './objects-2-object.ts'

Deno.test('objects2object', async (test) => {
  await test.step('Using number key field', () => {
    assertEquals(
      objects2object(
        [
          { id: 1, name: 'john' },
          { id: 2, name: 'jane' },
        ],
        'id',
      ),
      {
        1: { id: 1, name: 'john' },
        2: { id: 2, name: 'jane' },
      },
    )
  })

  await test.step('Using string key field', () => {
    assertEquals(
      objects2object(
        [
          { id: 1, name: 'john' },
          { id: 2, name: 'jane' },
        ],
        'name',
      ),
      {
        john: { id: 1, name: 'john' },
        jane: { id: 2, name: 'jane' },
      },
    )
  })

  await test.step('Overriding when has same key field', () => {
    assertEquals(
      objects2object(
        [
          { id: 1, name: 'john' },
          { id: 2, name: 'john' },
        ],
        'name',
      ),
      {
        john: { id: 2, name: 'john' },
      },
    )
  })
})
