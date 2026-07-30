# ADR-0001: es-toolkit との棲み分け

- Status: Accepted
- Date: 2026-07-31

## Context

- この repo は業務でのデータ操作時の type infer を主目的とした utility
  集として発足した。実装当時は [es-toolkit](https://es-toolkit.dev/)
  に欲しい機能が揃っておらず、利用者が作者と社内チームに限られることから「業務で使うコード全部入り」方針で拡張してきた
- 現在の es-toolkit は lodash 代替として成熟し、汎用データ操作 (array / object /
  math / predicate / promise) を高品質にカバーしている。本 repo の関数の一部は
  es-toolkit と機能が丸かぶりしており、維持拡張する価値がない
- 一方、本 repo の中核価値である「型健全性 (soundness)
  より業務上の利便性を優先する型推論 wrapper」(`objectKeys` が `(keyof T)[]`
  を返す等) は、健全性を守る es-toolkit の方針とは相容れず、upstream
  に統合できない
- 「どの関数がどちらにあるのか」を利用チームに毎回判断させる認知コストが、重複を放置する場合の実質的なコストである

## Decision

利用プロジェクト側では es-toolkit を第一候補とし、本 repo は「es-toolkit
にない価値」に絞って併存させる。

### 1. es-toolkit ゲート (新規追加の禁止則)

- 新規関数を追加する前に es-toolkit
  に同等機能がないか必ず確認し、既にあるものは原則追加しない (AGENTS.md
  にも明記済み)
- 本 repo に残す・追加するのは次のいずれかに該当するものだけ:
  - **型推論 wrapper**: 標準 API と同じ挙動で戻り値の型だけ narrow するもの
    (objectKeys, objectEntries, safeGet, unionof, nameof, utility-types 等)
  - **seed 決定的乱数系**: es-toolkit の乱数系は seed 再現をサポートしないため
    (lcg, hashBySeed, shuffled, randomInt)
  - **業務 util**: es-toolkit のスコープ外のもの (percent, numformat,
    remainingSeconds, waitUntilOrFail 等)

### 2. 丸かぶり関数の扱い — deprecated は「置換ミスが型エラーで検出できる」ものだけ

utility は利用箇所が多く一括置換されやすいため、**editor の strike-through
で機械的な置換を促す `@deprecated` は、置換を誤った場合にコンパイルエラーで
検出できるものに限定する**。静かな挙動差 (型の緩み・境界値・判定意味論の違い)
があるものへ付けると、安易な置換でコンパイルを通ったままバグが混入するリスクがあるため付けない。

#### 2-a. `@deprecated` 付与 (置換ミスが型エラーで検出できる)

利用プロジェクトが次回 latest を install した際に editor 上で気付ける。
削除はせず互換維持する (機能拡張はしない)。

| 本 repo           | es-toolkit   | 移行注意                                                                                      |
| ----------------- | ------------ | --------------------------------------------------------------------------------------------- |
| `chunk`           | `chunk`      | drop-in 置換可                                                                                |
| `unique`          | `uniq`       | drop-in 置換可                                                                                |
| `objectSwap`      | `invert`     | drop-in 置換可                                                                                |
| `sleepTimer`      | `delay`      | drop-in 置換可                                                                                |
| `missingElements` | `difference` | drop-in 置換可                                                                                |
| `recordBy`        | `keyBy`      | 引数順が逆: `recordBy(getKey, items)` → `keyBy(items, getKey)`。誤っても型エラーで検出できる  |
| `objects2object`  | `keyBy`      | `objects2object(items, 'id')` → `keyBy(items, item => item.id)`。書き換えは必要だが挙動は同等 |

#### 2-b. 移行検討 NOTE のみ (静かな挙動差あり、deprecated にしない)

JSDoc に「es-toolkit への移行を検討」の NOTE
と挙動差を記載するに留め、置換判断は利用箇所ごとに人間が行う。

| 本 repo   | es-toolkit | 挙動差 (安易に置換できない理由)                                                                         |
| --------- | ---------- | ------------------------------------------------------------------------------------------------------- |
| `range`   | `range`    | es-toolkit は end 排他: `range({ min: 1, max: 5 })` → `range(1, 6)`。境界値の off-by-one を生みやすい   |
| `groupBy` | `groupBy`  | es-toolkit は `Partial` でない `Record<K, V[]>` を返す。未存在キーの undefined チェックが外れて型が緩む |
| `isJson`  | `isJSON`   | 本実装は `String()` 強制のため非 string (例: 123) も判定するが、es-toolkit は string 以外を常に false   |

### 3. 機能が似ていても対象外のもの (判断記録)

- `shuffled` / `randomInt`: es-toolkit の `shuffle` / `randomInt` に seed
  再現機能がない。テスト・抽選再現の用途で seed が本質なので残す
- `isNumber`: es-toolkit の `isNumber` は `typeof === 'number'` 判定で NaN /
  Infinity も true。本実装は `isFinite` で除外しており意味論が異なる
  (安易に置換するとバグる)
- `groupsBy`: `[K, V[]][]` (entries) を返し、キーが `PropertyKey` 以外 (object
  等) でも Map ベースで扱える。es-toolkit の `groupBy` ではカバーできない
- `arrayCount`: 述語 / 値一致の出現数カウント。es-toolkit の `countBy`
  (キー別集計 Record) とは別物
- `hasDuplicate`: 直接の対応機能なし

## Alternatives Considered

- **upstream (es-toolkit) へ統合**: 型推論 wrapper は意図的に unsound
  であり、型健全性を守る es-toolkit
  の設計方針に反するため受け入れられる見込みがない。不採用
- **es-toolkit を dependency に含めて re-export**: zero-dependency
  の利点が消え、バージョン追従コストだけが残る。利用側が直接 es-toolkit
  を入れれば済む。不採用
- **重複を放置 (全部入り継続)**:
  維持コストは低いが「どちらにあるか」の認知コストを利用チームに払わせ続ける。不採用
- **挙動差ありのものも `@deprecated` にする**: strike-through
  が機械的な一括置換を誘発し、型の緩み (groupBy) や off-by-one (range)
  が静かに混入するリスクがある。不採用 (2-b の NOTE 方式へ変更)

## Consequences

### 良くなること

- repo の価値が「型推論 wrapper + seed 乱数 + 業務
  util」に明確化され、利用チームの判断が「汎用データ操作は
  es-toolkit、それ以外はここ」で済む
- 置換ミスが型エラーで検出できるものだけが strike-through
  になるため、利用プロジェクトは安全に置換できるものから es-toolkit
  導入を進められる

### リスク・コスト

- 利用プロジェクトに es-toolkit への移行作業が発生する (挙動差は 2-b の表参照)
- 2-b の関数は strike-through が出ないため、移行検討が漏れやすい (JSDoc の NOTE
  頼み)
- deprecated / NOTE
  対象を互換維持し続ける限り、テスト・ビルド対象としては残り続ける

## Migration Notes

- 2-a の 7 関数は es-toolkit 導入時に置換してよい (`recordBy` / `objects2object`
  は API 形の書き換えが必要だが、誤りは型エラーで検出できる)
- 2-b の 3 関数は挙動差の確認を利用箇所ごとに行い、人間判断で置換する
- 本 repo からの削除は行っていない (公開済みバージョンとの互換維持)

## Open Questions

- deprecated 関数を実際に削除するタイミング (v1.0.0 で削除する?
  利用プロジェクトの移行完了を待つ?)
- 2-b の関数を将来 deprecated へ昇格させる条件 (利用箇所の棚卸し完了後など)

## Progress

- 2026-07-31: 起票。丸かぶり 10 関数へ `@deprecated` 付与、AGENTS.md
  へゲート明記
- 2026-07-31: 挙動差あり 5 関数 (range, groupBy, recordBy, objects2object,
  isJson) は `@deprecated` を取り下げ、移行検討 NOTE のみに変更
  (安易な一括置換によるバグ混入リスクのため)
- 2026-07-31: recordBy, objects2object は置換ミスが型エラーで検出できるため
  `@deprecated` へ復帰 (2-b → 2-a)。deprecated の基準を「drop-in
  置換可」から「置換ミスが型エラーで検出できる」へ精緻化
