import { assertEquals, assertNotEquals } from "https://deno.land/std@0.186.0/testing/asserts.ts"
import { shuffled } from "./shuffled.ts"

Deno.test('shuffled', async (test) => {
  await test.step('works amount arg', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    assertEquals(
      shuffled(array, { pick: 3 }).length,
      3,
    )
    assertEquals(
      shuffled(array, { pick: 9 }).length,
      9,
    )
    assertEquals(
      shuffled(array, { pick: 0 }).length,
      array.length,
    )
    assertEquals(
      shuffled(array, { pick: 10 }).length,
      array.length,
    )
  })

  await test.step('check bias', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const
    const results = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
    }

    for (let index = 0; index < 10000; index++) {
      const picked = shuffled([...array], { pick: 1 })[0]

      results[picked]++
    }

    console.log(results)
  })

  await test.step('reproducibility with seeds', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    assertEquals(
      shuffled(array, { seed: 'clpjjoqrc00be3b6w985mhioy' }).every(v => array.includes(v)),
      true,
    )

    assertEquals(
      shuffled(array, { seed: 'seed-same' }),
      shuffled(array, { seed: 'seed-same' }),
    )

    assertNotEquals(
      shuffled(array, { seed: 'seed-one' }),
      shuffled(array, { seed: 'seed-two' }),
    )
  })
})
