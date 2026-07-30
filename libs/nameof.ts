/**
 * 型 T のプロパティ名を、型検査つきの文字列で返す (C# の nameof 相当)
 *
 * プロパティ名をマジックストリングで書くと rename に追従できないため、
 * 存在しない名前を compile error にして安全に文字列化する。
 *
 * @link https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/nameof
 * @link https://stackoverflow.com/questions/50470025/nameof-keyword-in-typescript
 * @example
 * type User = { id: number }
 * nameof<User>('id') // 'id'
 * nameof<User>('notExists') // compile error
 */
export const nameof = <T>(name: Extract<keyof T, string>): string => name
