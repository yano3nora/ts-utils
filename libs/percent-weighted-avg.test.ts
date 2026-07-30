import { assertEquals } from '@std/assert'
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
