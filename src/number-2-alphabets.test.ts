import { assertEquals } from 'https://deno.land/std@0.186.0/testing/asserts.ts'
import { number2alphabets } from './number-2-alphabets.ts'

Deno.test('number-2-alphabets', async test => {
  await test.step('first letters as a, b, c', () => {
    assertEquals(number2alphabets(0), 'A')
    assertEquals(number2alphabets(1), 'B')
    assertEquals(number2alphabets(2), 'C')
  })

  await test.step('y, z => aa, ab', () => {
    assertEquals(number2alphabets(24), 'Y')
    assertEquals(number2alphabets(25), 'Z')
    assertEquals(number2alphabets(26), 'AA')
    assertEquals(number2alphabets(27), 'AB')
  })

  await test.step('3 digit letters', () => {
    assertEquals(number2alphabets(701), 'ZZ')
    assertEquals(number2alphabets(702), 'AAA')
    assertEquals(number2alphabets(703), 'AAB')
    assertEquals(number2alphabets(704), 'AAC')
  })
})
