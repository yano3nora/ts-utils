import { assertEquals } from 'https://deno.land/std@0.186.0/testing/asserts.ts'
import { percentWeightedAvg } from './percent-weighted-avg.ts'

Deno.test('percentWeightedAvg', () => {
  assertEquals(
    percentWeightedAvg([
      { value: 150, weight: 320 },
      { value: 200, weight: 180 },
    ]),
    168,
  )
})
