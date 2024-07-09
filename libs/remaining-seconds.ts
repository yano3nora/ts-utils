/**
 * @example remainingSeconds(180); // '3:00'
 */
export const remainingSeconds = (second: number, hour = false) => {
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
