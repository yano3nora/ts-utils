import { assertEquals } from 'https://deno.land/std@0.186.0/testing/asserts.ts'
import { numformat } from './numformat.ts'

Deno.test('numformat', async test => {
  await test.step('number with commas', () => {
    assertEquals(numformat(0), '0')
    assertEquals(numformat(100), '100')
    assertEquals(numformat(1_000), '1,000')
    assertEquals(numformat(10_000), '10,000')
    assertEquals(numformat(100_000_000), '100,000,000')
  })

  await test.step('nan', () => {
    assertEquals(numformat(NaN), '')
    assertEquals(numformat(null), '')
    assertEquals(numformat(undefined), '')
    assertEquals(numformat(Infinity), '')
    assertEquals(numformat(-Infinity), '')
    assertEquals(numformat(NaN, { nan: '-' }), '-')
    assertEquals(numformat(NaN, { nan: 'NaN' }), 'NaN')
  })
})
