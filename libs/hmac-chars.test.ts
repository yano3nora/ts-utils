import { assertEquals, assertMatch, assertRejects } from '@std/assert'
import { CROCKFORD_BASE32, hmacChars } from './hmac-chars.ts'
import { hmacBytes } from './hmac-bytes.ts'

Deno.test('hmac-chars', async (test) => {
  await test.step('returns length chars from the default alphabet', async () => {
    const value = await hmacChars('secret', 'page:1', 8)
    assertEquals(value.length, 8)
    assertMatch(value, /^[0-9A-HJKMNP-TV-Z]{8}$/)
  })

  await test.step('maps each HMAC byte to alphabet[byte % 32]', async () => {
    const mac = await hmacBytes('secret', 'page:1')
    const expected = Array.from(
      mac.subarray(0, 8),
      (b) => CROCKFORD_BASE32[b % 32],
    )
      .join('')
    assertEquals(await hmacChars('secret', 'page:1', 8), expected)
  })

  await test.step('is deterministic and differs by key, message and prefix', async () => {
    assertEquals(
      await hmacChars('secret', 'page:1', 8),
      await hmacChars('secret', 'page:1', 8),
    )
    assertEquals(
      (await hmacChars('secret', 'page:1', 8)) ===
        (await hmacChars('other', 'page:1', 8)),
      false,
    )
    assertEquals(
      (await hmacChars('secret', 'page:1', 8)) ===
        (await hmacChars('secret', 'terminal:1', 8)),
      false,
    )
  })

  await test.step('accepts a custom alphabet whose length divides 256', async () => {
    assertMatch(
      await hmacChars('secret', 'page:1', 16, '0123456789abcdef'),
      /^[0-9a-f]{16}$/,
    )
    assertMatch(await hmacChars('secret', 'page:1', 8, '01'), /^[01]{8}$/)
  })

  await test.step('accepts the full digest length', async () => {
    assertEquals((await hmacChars('secret', 'page:1', 32)).length, 32)
    assertEquals(
      (await hmacChars('secret', 'page:1', 64, CROCKFORD_BASE32, 'SHA-512'))
        .length,
      64,
    )
  })

  await test.step('rejects a length out of range', async () => {
    await assertRejects(() => hmacChars('secret', 'page:1', 0), RangeError)
    await assertRejects(() => hmacChars('secret', 'page:1', 33), RangeError)
    await assertRejects(() => hmacChars('secret', 'page:1', 1.5), RangeError)
  })

  await test.step('rejects an alphabet that would bias the output', async () => {
    const base36 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    await assertRejects(
      () => hmacChars('secret', 'page:1', 8, base36),
      RangeError,
    )
    await assertRejects(
      () => hmacChars('secret', 'page:1', 8, 'AA'),
      RangeError,
    )
    await assertRejects(() => hmacChars('secret', 'page:1', 8, 'A'), RangeError)
  })

  await test.step('rejects an empty key', async () => {
    await assertRejects(() => hmacChars('', 'page:1', 8), RangeError)
  })
})
