import { isNumber } from './is-number.ts'

const DEFAULTS = {
  locales: 'ja-JP',
  invalid: '',
} satisfies Parameters<typeof dateformat>[1]

/**
 * dateformat - Intl.DateTimeFormat による日付フォーマッタ
 *
 * default は 'YYYY-MM-DD (曜)' の日本語表記 (グレゴリオ暦・紀元後のみ想定)。
 * Intl.DateTimeFormatOptions を渡すと Intl の出力そのままのカスタムができる。
 * いずれも実行環境の local timezone で解釈される。時刻・timezone
 * の細かい制御が必要になったら date ライブラリの導入を検討すること。
 *
 * @link https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
 * @example
 * dateformat(new Date(2022, 2, 19)) // '2022-03-19 (土)'
 * dateformat(new Date(2022, 2, 19), { locales: 'en-US' }) // '2022-03-19 (Sat)'
 * dateformat(new Date(2022, 2, 19), {
 *   locales: 'en-US',
 *   dateStyle: 'medium',
 * }) // 'Mar 19, 2022' (Intl の出力そのまま)
 */
export const dateformat = (
  date: number | Date,
  options?: Intl.DateTimeFormatOptions & {
    locales?: Parameters<typeof Intl.DateTimeFormat>[0]
    invalid?: string
  },
): string => {
  // { invalid: undefined } のような明示的 undefined でも default が効くよう
  // spread merge でなく分割代入の default を使う (戻り値 string の保証)
  const {
    locales = DEFAULTS.locales,
    invalid = DEFAULTS.invalid,
    ...intlOptions
  } = options ?? {}

  // Invalid Date / NaN は Intl.DateTimeFormat#format が throw するため先に弾く
  const time = date instanceof Date ? date.getTime() : date
  if (!isNumber(time)) {
    return invalid
  }

  // Intl.DateTimeFormatOptions が指定されたら Intl の出力をそのまま返す
  if (Object.keys(intlOptions).length > 0) {
    return new Intl.DateTimeFormat(locales, intlOptions).format(date)
  }

  // default: 'YYYY-MM-DD (曜)'
  // locale 文字列の直接加工は ICU 実装差に弱いため formatToParts で組み立てる
  const parts = new Intl.DateTimeFormat(locales, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
    // locales を差し替えても 'YYYY-MM-DD' 部分を保証するため
    // 暦 (和暦・仏暦等) と数字体系は固定する
    calendar: 'gregory',
    numberingSystem: 'latn',
  }).formatToParts(date)

  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? ''

  // year: 'numeric' は 4 桁未満の年を pad しないため揃える
  return `${part('year').padStart(4, '0')}-${part('month')}-${part('day')} (${
    part('weekday')
  })`
}
