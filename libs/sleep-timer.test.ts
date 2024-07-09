import { assertEquals } from 'https://deno.land/std@0.186.0/testing/asserts.ts'
import { sleepTimer } from './sleep-timer.ts'

Deno.test('sleepTimer - wait specified milliseconds', async () => {
  const waitingMs = 100
  let resolved = false

  // sleepTimerを使って waitingMs 待つ promise を作成
  sleepTimer(waitingMs).then(() => {
    resolved = true
  })

  // まだ時間は経っていないので、resolved は false
  assertEquals(resolved, false)

  // waitingMs 経過させる
  await new Promise((resolve) => setTimeout(resolve, waitingMs))

  // resolved が true になってるはず
  assertEquals(resolved, true)
})
