import { assertEquals } from '@std/assert'
import { dateformat } from './dateformat.ts'

Deno.test('dateformat', () => {
  // 実行環境の timezone に依存しないよう local time で構築する
  const date = new Date(2022, 2, 19)

  // default: ISO っぽい - 区切り + 日本語曜日
  assertEquals(dateformat(date), '2022-03-19 (土)')
  assertEquals(dateformat(date.getTime()), '2022-03-19 (土)')

  // locales だけ変えると default 形式のまま曜日表記が変わる
  assertEquals(dateformat(date, { locales: 'en-US' }), '2022-03-19 (Sat)')

  // Intl.DateTimeFormatOptions を渡すと Intl の出力そのまま
  assertEquals(
    dateformat(date, { locales: 'en-US', dateStyle: 'medium' }),
    'Mar 19, 2022',
  )
  assertEquals(
    dateformat(date, { month: 'long', day: 'numeric' }),
    '3月19日',
  )

  // locales に非グレゴリオ暦系を渡しても default 形式は暦・数字体系を固定
  assertEquals(
    dateformat(date, { locales: 'ja-JP-u-ca-japanese' }),
    '2022-03-19 (土)',
  )

  // 明示的な undefined 指定でも default が効く
  assertEquals(dateformat(date, { locales: undefined }), '2022-03-19 (土)')
  assertEquals(dateformat(NaN, { invalid: undefined }), '')

  // Invalid Date / NaN は invalid (default '') を返す
  assertEquals(dateformat(new Date('nonsense')), '')
  assertEquals(dateformat(NaN), '')
  assertEquals(dateformat(new Date('nonsense'), { invalid: '-' }), '-')
})
