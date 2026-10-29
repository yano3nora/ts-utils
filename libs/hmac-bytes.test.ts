import { assertEquals, assertRejects } from '@std/assert'
import { hmacBytes } from './hmac-bytes.ts'

Deno.test('hmac-bytes', async (test) => {
  await test.step('returns the digest length of the hash', async () => {
    assertEquals((await hmacBytes('secret', 'message')).length, 32)
    assertEquals((await hmacBytes('secret', 'message', 'SHA-1')).length, 20)
    assertEquals((await hmacBytes('secret', 'message', 'SHA-512')).length, 64)
  })

  await test.step('matches a known HMAC-SHA256 vector', async () => {
    // RFC 4231 Test Case 2
    const mac = await hmacBytes('Jefe', 'what do ya want for nothing?')
    const hex = Array.from(mac, (b) => b.toString(16).padStart(2, '0')).join('')
    assertEquals(
      hex,
      '5bdcc146bf60754e6a042426089575c75a003f089d2739839dec58b964ec3843',
    )
  })

  await test.step('accepts string and its UTF-8 bytes equally', async () => {
    const encoder = new TextEncoder()
    assertEquals(
      await hmacBytes(encoder.encode('secret'), encoder.encode('message')),
      await hmacBytes('secret', 'message'),
    )
  })

  await test.step('rejects an empty key', async () => {
    await assertRejects(() => hmacBytes('', 'message'), RangeError)
    await assertRejects(
      () => hmacBytes(new Uint8Array(), 'message'),
      RangeError,
    )
  })
})
