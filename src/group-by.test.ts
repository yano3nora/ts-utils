import { assertEquals } from 'https://deno.land/std@0.186.0/testing/asserts.ts'
import { groupBy, groupsBy } from './group-by.ts'

Deno.test('group-by', async test => {
  const users = [
    { id: 1, name: 'john', role: 'admin' },
    { id: 2, name: 'jane', role: 'admin' },
    { id: 3, name: 'jack', role: 'user' },
  ]

  await test.step('groups-by', () => {
    assertEquals(
      groupsBy(users, user => user.role),
      [
        [
          'admin',
          [
            { id: 1, name: 'john', role: 'admin' },
            { id: 2, name: 'jane', role: 'admin' },
          ],
        ],
        [
          'user',
          [
            { id: 3, name: 'jack', role: 'user' },
          ],
        ],
      ],
    )
  })

  await test.step('group-by', () => {
    assertEquals(
      groupBy(users, user => user.role),
      {
        admin: [
          { id: 1, name: 'john', role: 'admin' },
          { id: 2, name: 'jane', role: 'admin' },
        ],
        user: [
          { id: 3, name: 'jack', role: 'user' },
        ],
      }
    )
  })
})
