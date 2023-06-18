/**
 * @example nameof<MyType>('existsProp') // 'existsProp'
 * @example nameof<MyType>('notExistsProp') // compile error
 *
 * @link https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/nameof
 * @link https://stackoverflow.com/questions/50470025/nameof-keyword-in-typescript
 * @link https://schneidenbach.gitbooks.io/typescript-cookbook/content/nameof-operator.html
 * @link https://github.com/dsherret/ts-nameof/issues/121
 */
export const nameof = <T>(name: Extract<keyof T, string>): string => name
