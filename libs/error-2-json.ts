// deno-lint-ignore-file no-explicit-any

/**
 * Error を JSON 文字列へ変換する
 *
 * JSON.stringify(error) は name / message / stack を落としてしまうため、
 * logging やエラー送信用にそれらと自前 (own) のカスタムプロパティを拾って
 * 文字列化する。
 *
 * @link https://github.com/getsentry/sentry-javascript/pull/1060/files
 * @link https://sosukesuzuki.dev/posts/stage-3-object-hasown/
 * @example
 * error2json(new Error('oops')) // '{"name":"Error","message":"oops","stack":"..."}'
 */
export const error2json = (error: any): string => {
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
