export const isUrl = (str: string) => {
  try {
    new URL(str).toString()
  } catch {
    return false
  }

  return true
}
