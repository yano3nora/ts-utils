import { assertEquals } from 'https://deno.land/std@0.186.0/testing/asserts.ts'
import { randomInt } from './random-int.ts'

/**
 * TODO ランダムで不安定なテスト
 */
Deno.test('randomInt - returns a number between 0 and 10', () => {
  for (let index = 0; index < 100; index++) {
    const result = randomInt(0, 10)
    assertEquals(typeof result, 'number')
    assertEquals(result >= 0 && result <= 10, true)
  }
})
