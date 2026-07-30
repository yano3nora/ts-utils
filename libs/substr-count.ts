/**
 * substrCount - 文字列中に含まれる部分文字列の出現回数を返す (PHP の substr_count 相当)
 *
 * NOTE 判定は String.prototype.split によるため、重なり合う出現は数えない
 *      ('aaa' 中の 'aa' は 1 回)。空文字の search は 0 を返す
 *
 * @link https://qiita.com/simiraaaa/items/13b87190e9e1afc23e81
 * @example substrCount('テストですテストテス', 'テス') // 3
 */
export const substrCount = (target: string, search: string): number => {
  if (search === '') {
    return 0
  }

  return target.split(search).length - 1
}
