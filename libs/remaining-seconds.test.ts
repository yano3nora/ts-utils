import { assertEquals } from '@std/assert'
import { remainingSeconds } from './remaining-seconds.ts'

Deno.test('remainingSeconds', () => {
  assertEquals(remainingSeconds(0), '00:00')
  assertEquals(remainingSeconds(90), '01:30')
  assertEquals(remainingSeconds(180), '03:00')

  // 秒は切り上げ
  assertEquals(remainingSeconds(59.2), '01:00')

  // hour 指定時は 'HH:MM:SS'、未指定時は 'MM' が 60 を超えて伸びる
  assertEquals(remainingSeconds(3900, true), '01:05:00')
  assertEquals(remainingSeconds(3900), '65:00')
})
