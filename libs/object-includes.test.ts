// deno-lint-ignore-file no-explicit-any
import { assertEquals } from 'https://deno.land/std@0.186.0/testing/asserts.ts'
import { objectIncludes } from './object-includes.ts'

Deno.test('object-includes', () => {
  const obj = { 1: 'hello', 2: 'world', 3: false, 4: 999, 5: 0, 6: null }
  const results = [
    objectIncludes(obj, 'hello'),
    objectIncludes(obj, (v: any) => String(v).startsWith('war')),
    objectIncludes(obj, (v: any) => String(v).startsWith('wor')),
    objectIncludes(obj, 'john'),
    objectIncludes(obj, ''),
    objectIncludes(obj, true),
    objectIncludes(obj, false),
    objectIncludes(obj, 111),
    objectIncludes(obj, 999),
    objectIncludes(obj, 0),
    objectIncludes(obj, null),
  ]

  assertEquals(
    results,
    [true, false, true, false, false, false, true, false, true, true, true],
  )
})
