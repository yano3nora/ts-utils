import { assertEquals } from 'https://deno.land/std@0.186.0/testing/asserts.ts'
import { arrayCount } from './array-count.ts'

Deno.test('object-includes', () => {
  const array = [
    1,
    2,
    2,
    3,
    3,
    3,
    '4',
    null,
    false,
    undefined,
    true,
    true,
    [],
    [1, 2, 3],
    { number: '4' },
  ]

  const equals = [
    [
      arrayCount(array, 1),
      1,
    ],
    [
      arrayCount(array, 2),
      2,
    ],
    [
      arrayCount(array, 3),
      3,
    ],
    [
      arrayCount(array, (v) => v === '4'),
      1,
    ],
    [
      arrayCount(array, null),
      1,
    ],
    [
      arrayCount(array, false),
      1,
    ],
    [
      arrayCount(array, undefined),
      1,
    ],
    [
      arrayCount(array, true),
      2,
    ],
    [
      arrayCount(array, (v) => Array.isArray(v)),
      2,
    ],
    [
      arrayCount(array, (v) => (
        v !== null &&
        typeof v === 'object' &&
        Object.hasOwn(v, 'number')
      )),
      1,
    ],
  ]

  assertEquals(
    equals.map((v) => v[0]),
    equals.map((v) => v[1]),
  )
})
