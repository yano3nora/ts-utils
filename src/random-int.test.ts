import { assertEquals } from 'https://deno.land/std@0.186.0/testing/asserts.ts'
import { randomInt } from './random-int.ts'

/**
 * TODO ランダムで不安定なテスト
 */
Deno.test('randomInt', async test => {
  await test.step('returns a number between 0 and 10', () => {
    for (let index = 0; index < 100; index++) {
      const result = randomInt(0, 10)
      assertEquals(typeof result, 'number')
      assertEquals(result >= 0 && result <= 10, true)
    }
  })

  await test.step('check bias', () => {
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
      const output = randomInt(1, 9) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

      results[output]++
    }

    console.log(results)
  })


  await test.step('check bias with seed', () => {
    const seed = 'this will seed return ...' // 9
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
      const output = randomInt(1, 9, seed) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

      results[output]++
    }

    assertEquals(results, {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 10000,
    })
  })
})
