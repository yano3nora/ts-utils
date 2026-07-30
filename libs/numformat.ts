import { isNumber } from './is-number.ts'

const DEFAULTS = {
  locales: undefined,
  nan: '',
  maximumFractionDigits: 1,
} satisfies Parameters<typeof numformat>[1]

/**
 * numformat - Intl.NumberFormat による数値フォーマッタ
 *
 * NOTE default の maximumFractionDigits (1) は「style 未指定 (decimal) かつ
 *      fraction digits 未指定」のときだけ適用する。currency / percent は
 *      Intl 本来の既定桁数を尊重し、minimumFractionDigits 単独指定と
 *      矛盾して RangeError になるのも防ぐため
 */
export const numformat = (
  number: unknown,
  options?: Intl.NumberFormatOptions & {
    locales?: Parameters<typeof Intl.NumberFormat>[0]
    nan?: string
  },
): string => {
  const {
    locales = DEFAULTS.locales,
    nan = DEFAULTS.nan,
    ...intlOptions
  } = options ?? {}

  if (
    intlOptions.maximumFractionDigits === undefined &&
    intlOptions.minimumFractionDigits === undefined &&
    (intlOptions.style === undefined || intlOptions.style === 'decimal')
  ) {
    intlOptions.maximumFractionDigits = DEFAULTS.maximumFractionDigits
  }

  const formatter = new Intl.NumberFormat(locales, intlOptions)

  if (!isNumber(number)) {
    return nan
  }

  return formatter.format(number)
}
