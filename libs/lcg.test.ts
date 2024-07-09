import { assertEquals, assertRejects } from 'https://deno.land/std@0.186.0/testing/asserts.ts'
import { isNumber } from './is-number.ts'
import { LCG } from './lcg.ts'

Deno.test('lcg', async test => {
  await test.step('passing no percentage', () => {
    const gen = LCG(0)
    const results = []

    for (let i = 0; i < 100; i++) {
      results[i] = gen.next().value
    }

    assertEquals(
      results.every(n => isNumber(n) && n > 0),
      true,
    )
  })

  await test.step('passing percentage', () => {
    const gen = LCG(0, true)
    const results = []

    for (let i = 0; i < 100; i++) {
      results[i] = gen.next().value
    }

    assertEquals(
      results.every(n => isNumber(n) && n > 0 && n < 1),
      true,
    )
  })

  await test.step('throws when passed negative seed', async () => {
    await assertRejects(async () => {
      const gen = LCG(-100000)
      await gen.next().value
    })
  })
})
