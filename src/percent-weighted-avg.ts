/**
 * 単純な 100% の配分で重み付けできる「値:重み」の列挙から、加重平均値を導出する
 *
 * @link https://jp.indeed.com/career-advice/career-development/how-to-calculate-weighted-average
 * @example percentWeightedAvg([
 *   { value: 150, weight: 320 },
 *   { value: 200, weight: 180 },
 * ]) // 168
 */
export const percentWeightedAvg = (data = [{ value: 0, weight: 0 }]) => {
  const sumOfWeight = data.reduce((a, d) => a + d.weight, 0)

  return data.reduce((a, d) => (
    a + (
      d.value * (d.weight / sumOfWeight)
    )
  ), 0)
}
