import { assertEquals } from 'https://deno.land/std@0.186.0/testing/asserts.ts'
import { getRank } from './get-rank.ts'

Deno.test('get-rank', async (test) => {
  await test.step('1st', () => {
    assertEquals(getRank([10, 22, 28, 32, 34], 34), 1)
  })
  await test.step('2nd', () => {
    assertEquals(getRank([10, 22, 28, 32, 34], 32), 2)
  })
  await test.step('last', () => {
    assertEquals(getRank([10, 22, 28, 32, 34], 10), 5)
  })
  await test.step('out of range as first', () => {
    assertEquals(getRank([10, 22, 28, 32, 34], 100), 1)
  })
  await test.step('out of range as last', () => {
    assertEquals(getRank([10, 22, 28, 32, 34], 1), 6)
  })
  await test.step('out of range as mid', () => {
    assertEquals(getRank([10, 22, 28, 32, 34], 30), 3)
  })
  await test.step('same rank 1st', () => {
    assertEquals(getRank([10, 20, 20, 30, 30], 30), 1)
  })
  await test.step('same rank 2nd', () => {
    assertEquals(getRank([10, 20, 20, 30, 30], 20), 3)
  })
  await test.step('same rank last', () => {
    assertEquals(getRank([10, 20, 20, 30, 30], 10), 5)
  })
})
