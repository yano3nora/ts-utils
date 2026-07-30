/**
 * type inferable Object.hasOwn
 *
 * NOTE 意図的に unsound: 未設定の optional property や prototype 由来の
 *      property は hasOwn が false になるため、false 側は「T のキーでない」
 *      とは限らない。narrow は true 側だけ信用すること
 *
 * @link https://github.com/microsoft/TypeScript/issues/47450#issuecomment-1013737149
 * @link https://javascript.plainenglish.io/in-vs-hasown-vs-hasownproperty-in-javascript-885771d2d100
 * @example
 * const myObject = { hello: 'world' }
 * const input = prompt('enter key')!
 *
 * if (objectHas(myObject, input)) {
 *   console.log(input)
 *   //          ^^^^^ infer 'hello'
 * }
 */
export const objectHas = <T extends object>(
  object: T,
  key: PropertyKey,
): key is keyof T => Object.hasOwn(object, key)
