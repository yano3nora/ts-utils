import { assertEquals } from 'https://deno.land/std@0.186.0/testing/asserts.ts'
import { objectEntries } from './object-entries.ts'

Deno.test('object-entries', async test => {
  await test.step('same result as Object.entries', () => {
    const obj = { 1: 'hello', 2: 'world' }
    const custom = objectEntries(obj).flatMap(([k, v]) => [k, v])
    const original = Object.entries(obj).flatMap(([k, v]) => [k, v])

    assertEquals(
      custom,
      original,
    )
  })
})
