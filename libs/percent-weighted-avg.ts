/**
 * 「値:重み」の列挙から加重平均値を導出する
 *
 * 重みの合計を 100% とみなして単純配分する。評価スコアの合成など、
 * 重みの単位が揃っていれば割合でも実数でもよい。
 *
 * @link https://jp.indeed.com/career-advice/career-development/how-to-calculate-weighted-average
 * @example
 * percentWeightedAvg([
 *   { value: 150, weight: 320 },
 *   { value: 200, weight: 180 },
 * ]) // 168
 */
export const percentWeightedAvg = (
  data: { value: number; weight: number }[] = [{ value: 0, weight: 0 }],
): number => {
  const sumOfWeight = data.reduce((a, d) => a + d.weight, 0)

  return data.reduce((a, d) => (
    a + (
      d.value * (d.weight / sumOfWeight)
    )
  ), 0)
}
