export const isJson = (json: unknown) => {
  try {
    JSON.parse(String(json))
  } catch {
    return false
  }

  return true
}
