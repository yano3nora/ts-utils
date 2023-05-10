// deno-lint-ignore-file no-explicit-any

/**
 * error to json string
 *
 * @ref https://github.com/getsentry/sentry-javascript/pull/1060/files
 * @ref https://sosukesuzuki.dev/posts/stage-3-object-hasown/
 */
export const error2json = (error: any) => {
  const e: any = {
    name: error?.name,
    message: error?.message,
    stack: error?.stack,
  }

  // for custom props (not inherited)
  for (const prop in error) {
    if (Object.hasOwn(error, prop)) {
      e[prop] = error[prop]
    }
  }

  return JSON.stringify(e)
}
