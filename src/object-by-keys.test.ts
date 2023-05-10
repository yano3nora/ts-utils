import { assertEquals } from 'https://deno.land/std@0.186.0/testing/asserts.ts'
import { objectByKeys } from './object-by-keys.ts'

Deno.test('object-by-keys', async (test) => {
  await test.step('no params to be undefined', () => {
    assertEquals(
      objectByKeys([1, 2, 3]),
      {
        1: undefined,
        2: undefined,
        3: undefined,
      },
    )
  })

  await test.step('specified params to be value', () => {
    assertEquals(
      objectByKeys([1, 2, 3], 'initial'),
      {
        1: 'initial',
        2: 'initial',
        3: 'initial',
      },
    )
  })

  await test.step('function return to be value', () => {
    assertEquals(
      objectByKeys([1, 2, 3], (n) => n * 10),
      {
        1: 10,
        2: 20,
        3: 30,
      },
    )
  })
})
