import { isNumber } from './is-number.ts'

const DEFAULTS = {
  locales: undefined,
  nan: '',
  maximumFractionDigits: 1,
} satisfies Parameters<typeof numformat>[1]

export const numformat = (
  number: unknown,
  options?: Intl.NumberFormatOptions & {
    locales?: Parameters<typeof Intl.NumberFormat>[0]
    nan?: string
  },
): string => {
  const opts = { ...DEFAULTS, ...options }
  const { locales, nan } = opts
  const formatter = new Intl.NumberFormat(locales, options)

  if (!isNumber(number)) {
    return nan
  }

  return formatter.format(number)
}
