import { assertEquals } from 'https://deno.land/std@0.186.0/testing/asserts.ts'
import { recordBy } from './record-by.ts'

Deno.test('record-by', () => {
  type Keys = 1 | 2
  const obj = recordBy<Keys, { id: Keys; name: string }>(
    (item) => item.id,
    [
      { id: 1, name: 'john' },
      { id: 2, name: 'jane' },
      // { id: 3, name: 'bob' }, // type error
    ],
  ) // => { 1: { id: 1, name: 'john' }, 2: { id: 2, name: 'jane' } }

  obj[1].name // john
  // obj[3].name // type error

  assertEquals(
    obj,
    { 1: { id: 1, name: 'john' }, 2: { id: 2, name: 'jane' } },
  )
})
