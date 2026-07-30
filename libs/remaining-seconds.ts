/**
 * 残り秒数を 'MM:SS' (hour 指定時は 'HH:MM:SS') の文字列へ整形する
 *
 * カウントダウン表示用。秒は切り上げ、各パートは 2 桁 0 埋めする。
 *
 * NOTE hour を指定しない場合、60 分以上は 'MM' が 60 を超えて伸びる
 *      (例: 3900 秒 → '65:00')
 *
 * @example
 * remainingSeconds(180) // '03:00'
 * remainingSeconds(3900, true) // '01:05:00'
 */
export const remainingSeconds = (second: number, hour = false): string => {
  const s = Math.ceil(second)
  const hours = Math.floor(s / 3600)
  const minutes = Math.floor(s / 60)
  const minutesForHour = minutes - (hours * 60)
  const seconds = s - (minutes * 60)

  const formatted = {
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    minutesH: minutesForHour.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0'),
  }

  if (hour) {
    return `${formatted.hours}:${formatted.minutesH}:${formatted.seconds}`
  }

  return `${formatted.minutes}:${formatted.seconds}`
}
