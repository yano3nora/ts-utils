import { assertEquals } from '@std/assert'
import { numformat } from './numformat.ts'

Deno.test('numformat', async (test) => {
  await test.step('number with commas', () => {
    assertEquals(numformat(0), '0')
    assertEquals(numformat(100), '100')
    assertEquals(numformat(1_000), '1,000')
    assertEquals(numformat(10_000), '10,000')
    assertEquals(numformat(100_000_000), '100,000,000')
  })

  await test.step('maximumFractionDigits (DEFAULTS の 1 が効くこと)', () => {
    assertEquals(numformat(1.25), '1.3')
    assertEquals(numformat(0.123), '0.1')
    assertEquals(numformat(1234.56), '1,234.6')

    // options 指定で default を上書きできること
    assertEquals(numformat(1.2346, { maximumFractionDigits: 3 }), '1.235')
    assertEquals(numformat(1.5, { maximumFractionDigits: 0 }), '2')

    // minimumFractionDigits 単独指定でも default と矛盾して RangeError にならない
    assertEquals(
      numformat(1.2, { locales: 'en-US', minimumFractionDigits: 2 }),
      '1.20',
    )

    // currency / percent は Intl 本来の既定桁数を尊重する
    assertEquals(
      numformat(1234.56, {
        locales: 'en-US',
        style: 'currency',
        currency: 'USD',
      }),
      '$1,234.56',
    )
    assertEquals(
      numformat(0.123, { locales: 'en-US', style: 'percent' }),
      '12%',
    )
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
