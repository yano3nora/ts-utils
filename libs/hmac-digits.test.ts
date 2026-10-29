import { assertEquals, assertRejects } from '@std/assert'
import { hmacDigits } from './hmac-digits.ts'

// RFC 4226 Appendix D の counter (8 バイト big-endian)
const counter = (count: number) => {
  const bytes = new Uint8Array(8)
  new DataView(bytes.buffer).setBigUint64(0, BigInt(count))
  return bytes
}

Deno.test('hmac-digits', async (test) => {
  await test.step('matches RFC 4226 Appendix D test vectors with SHA-1', async () => {
    const secret = '12345678901234567890'
    const expected = [
      '755224',
      '287082',
      '359152',
      '969429',
      '338314',
      '254676',
      '287922',
      '162583',
      '399871',
      '520489',
    ]

    const actual = await Promise.all(
      expected.map((_, count) =>
        hmacDigits(secret, counter(count), 6, 'SHA-1')
      ),
    )

    assertEquals(actual, expected)
  })

  await test.step('uses SHA-256 by default', async () => {
    assertEquals(await hmacDigits('secret', 'event:0', 8), '28356786')
    assertEquals(await hmacDigits('secret', 'event:0', 6), '356786')
  })

  await test.step('pads leading zeros to digits', async () => {
    assertEquals(await hmacDigits('secret', 'event:23', 8), '01954405')
  })

  await test.step('returns same value from string and its UTF-8 bytes', async () => {
    const encoder = new TextEncoder()

    assertEquals(
      await hmacDigits(encoder.encode('secret'), encoder.encode('event:0'), 8),
      await hmacDigits('secret', 'event:0', 8),
    )
  })

  await test.step('separates values by message prefix', async () => {
    assertEquals(
      (await hmacDigits('secret', 'terminal:1', 8)) ===
        (await hmacDigits('secret', 'event:1', 8)),
      false,
    )
  })

  await test.step('accepts empty message', async () => {
    assertEquals((await hmacDigits('secret', '', 8)).length, 8)
  })

  await test.step('throws RangeError when key is empty', async () => {
    for (const key of ['', new Uint8Array()]) {
      await assertRejects(() => hmacDigits(key, 'event:0', 8), RangeError)
    }
  })

  await test.step('throws RangeError when digits is out of 1-9', async () => {
    for (const digits of [0, 10, 1.5, NaN]) {
      await assertRejects(
        () => hmacDigits('secret', 'event:0', digits),
        RangeError,
      )
    }
  })
})
