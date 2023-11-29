export const char2codes = (str: string) => {
  let hash = 0

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash >>>= 0 // to 32 bit positive number
  }

  return hash
}
