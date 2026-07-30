import {
  assertEquals,
  assertRejects,
} from '@std/assert'
import { waitUntilOrFail } from './wait-until-or-fail.ts'

Deno.test('wait-until-or-fail', async (test) => {
  await test.step('success', async () => {
    let conditionMet = false
    setTimeout(() => {
      conditionMet = true
    }, 500)

    await waitUntilOrFail(() => conditionMet, { timeoutMillis: 1000 })
    assertEquals(conditionMet, true)
  })

  await test.step('failure', async () => {
    const conditionMet = false

    await assertRejects(async () =>
      await waitUntilOrFail(() => conditionMet, { timeoutMillis: 500 })
    )
  })
})
