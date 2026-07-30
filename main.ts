/**
 * TypeScript の型推論 (type infer) を効かせたデータ操作 utility 集。
 *
 * 汎用のデータ操作は {@link https://es-toolkit.dev/ | es-toolkit}
 * を第一候補とし、この package は es-toolkit にない次の 3 領域を提供する
 * (棲み分けの詳細は repo の docs/ADR-0001 を参照):
 *
 * - **型推論 wrapper**: {@linkcode objectKeys}, {@linkcode objectEntries},
 *   {@linkcode objectHas}, {@linkcode safeGet}, {@linkcode nameof},
 *   {@linkcode unionof} など、標準 API の戻り値を narrow された型で受けるもの
 * - **seed 決定的乱数**: {@linkcode LCG}, {@linkcode randomInt},
 *   {@linkcode shuffled}, {@linkcode hashBySeed} — 同一 seed から結果を再現できる
 * - **業務 util**: {@linkcode numformat}, {@linkcode dateformat},
 *   {@linkcode remainingSeconds}, {@linkcode waitUntilOrFail} など
 *
 * `@deprecated` 付きの関数は es-toolkit の同等機能へ移行できる
 * (置換ミスは型エラーで検出できる。維持はするが機能拡張しない)。
 *
 * @example
 * ```ts
 * import { objectKeys } from '@yano3nora/ts-utils'
 *
 * const user = { id: 1, name: 'john' }
 * objectKeys(user) // ('id' | 'name')[] へ推論される
 * ```
 *
 * @module
 */
export * from './libs/array-count.ts'
export * from './libs/char-2-codes.ts'
export * from './libs/char-count.ts'
export * from './libs/chunk.ts'
export * from './libs/dateformat.ts'
export * from './libs/error-2-json.ts'
export * from './libs/get-rank.ts'
export * from './libs/group-by.ts'
export * from './libs/has-duplicate.ts'
export * from './libs/hash-by-seed.ts'
export * from './libs/is-json.ts'
export * from './libs/is-number.ts'
export * from './libs/is-url.ts'
export * from './libs/lcg.ts'
export * from './libs/missing-elements.ts'
export * from './libs/nameof.ts'
export * from './libs/number-2-alphabets.ts'
export * from './libs/numformat.ts'
export * from './libs/object-by-keys.ts'
export * from './libs/object-entries.ts'
export * from './libs/object-has.ts'
export * from './libs/object-includes.ts'
export * from './libs/object-key-by-value.ts'
export * from './libs/object-keys-by-value.ts'
export * from './libs/object-keys.ts'
export * from './libs/object-swap.ts'
export * from './libs/objects-2-object.ts'
export * from './libs/percent-weighted-avg.ts'
export * from './libs/percent.ts'
export * from './libs/random-int.ts'
export * from './libs/range.ts'
export * from './libs/record-by.ts'
export * from './libs/remaining-seconds.ts'
export * from './libs/safe-get.ts'
export * from './libs/shuffled.ts'
export * from './libs/sleep-timer.ts'
export * from './libs/substr-count.ts'
export * from './libs/unionof.ts'
export * from './libs/unique.ts'
export * from './libs/utility-types.ts'
export * from './libs/wait-until-or-fail.ts'
