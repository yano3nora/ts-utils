import { assertEquals } from 'https://deno.land/std@0.186.0/testing/asserts.ts'
import { hasDuplicate } from './has-duplicate.ts'

Deno.test('has-duplicate', async test => {
  await test.step('returns false for an empty array', () => {
    assertEquals(hasDuplicate([]), false)
  })

  await test.step('returns false when the array has only one value', () => {
    assertEquals(hasDuplicate([1]), false)
  })

  await test.step('returns false when primitive values are unique', () => {
    assertEquals(hasDuplicate([1, 2, 3]), false)
  })

  await test.step('returns true when primitive values include duplicates', () => {
    assertEquals(hasDuplicate([1, 2, 1]), true)
  })

  await test.step('returns true when falsy values include duplicates', () => {
    assertEquals(hasDuplicate([0, '', false, null, undefined, 0]), true)
  })

  await test.step('returns true when NaN appears more than once', () => {
    assertEquals(hasDuplicate([1, NaN, 3, NaN]), true)
  })

  await test.step('returns false for different object references without getKey', () => {
    assertEquals(hasDuplicate([{ id: 1 }, { id: 1 }]), false)
  })

  await test.step('returns true for the same object reference without getKey', () => {
    const user = { id: 1, name: 'john' }

    assertEquals(hasDuplicate([user, { id: 2, name: 'jane' }, user]), true)
  })

  await test.step('returns true when duplicate keys are detected via getKey', () => {
    const users = [
      { id: 1, name: 'john' },
      { id: 1, name: 'jane' },
    ]

    assertEquals(hasDuplicate(users, user => user.id), true)
  })

  await test.step('returns false when derived keys are unique', () => {
    const users = [
      { id: 1, name: 'john' },
      { id: 2, name: 'jane' },
    ]

    assertEquals(hasDuplicate(users, user => user.id), false)
  })

  await test.step('returns true when different objects resolve to the same derived key', () => {
    const users = [
      { id: 1, name: 'john' },
      { id: 2, name: 'john' },
    ]

    assertEquals(hasDuplicate(users, user => user.name), true)
  })
})
