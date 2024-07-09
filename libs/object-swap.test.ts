import { assertEquals } from 'https://deno.land/std@0.186.0/testing/asserts.ts'
import { objectSwap } from './object-swap.ts'

Deno.test('object-swap', () => {
  assertEquals(
    objectSwap({ x: 1, y: 2 }),
    { 1: 'x', 2: 'y' },
  )
})
