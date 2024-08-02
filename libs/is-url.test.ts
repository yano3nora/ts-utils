import { assertEquals } from 'https://deno.land/std@0.186.0/testing/asserts.ts'
import { isUrl } from './is-url.ts'

Deno.test('is-url', async test => {
  await test.step('valid url', () => {
    const validUrl = 'https://example.com?hoge=fuga&piyo=buz'

    assertEquals(
      isUrl(validUrl),
      true,
    )
  })

  await test.step('invalid url', () => {
    const invalidUrl = 'https//:example?hoge====fuga&&&&piyo=buz'

    assertEquals(
      isUrl(invalidUrl),
      false,
    )
  })
})
