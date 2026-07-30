# AGENTS - Development Guide

## Overview

- TypeScript の型推論 (type infer) を効かせたデータ操作 utility 関数集。Deno
  で開発し、[@deno/dnt](https://github.com/denoland/dnt) で CJS/ESM dual package
  にビルドして npm へ `@yano3nora/ts-utils` として公開する
- 技術スタック: Deno 2.x (mise.toml で project local に pin)、テストは
  `deno test` + `jsr:@std/assert`、build は `@deno/dnt`。**runtime 依存はゼロ**
- 最重要ドキュメント: `README.md` (usage / 開発フロー / release
  手順)。設計・タスク記録は `docs/` (ADR / SPEC / TASK / BACKLOG、詳細は後述の
  Documentation 参照)
- 関連 repo / 移植元: なし (この repo
  発)。個別関数の出典・参考記事は各ファイルの JSDoc `@link`
  で参照する。比較対象ライブラリとして
  [es-toolkit](https://github.com/toss/es-toolkit) を意識する (後述)

### 🎯 Role & Objective

あなたはエキスパートソフトウェアエンジニアとして、この repo
の設計・実装・テストを行うこと。

### 🚨 CRITICAL: Architecture

- **型推論ファースト**: 標準 API (`Object.keys` 等) が返す広い型を、利用側で
  narrow された型のまま受け取れるようにするのがこの repo の存在意義。型健全性
  (soundness) より業務上の利便性を優先した意図的な `as`
  キャストを含むため、unsound な箇所には JSDoc で注意書きを残すこと (例:
  `libs/object-keys.ts` の NOTE)
- **依存境界**: runtime 依存ゼロを維持する。npm パッケージの追加は不可。dev
  依存も jsr (`@deno/dnt`, `@std/assert`) のみ。`libs/` 内の相互 import
  は可能だが最小限に留める
- **状態管理の原則**: 全関数は pure / stateless を原則とし、module-level の
  global state・singleton・cache は持たない。乱数系 (`lcg`) は seed
  引数による決定的な generator とし、状態は generator インスタンス内に閉じる
- **失敗モード**: JS 仕様上 object key は常に string になる (number key
  の型とのズレに注意)。入力が空配列・空 object・`undefined`/`null`
  のケースを常にテストする。lookup 系の戻り値は `Partial<Record<...>>` や
  `| undefined` で「存在しない可能性」を型で表現する
- **YAGNI / es-toolkit ゲート**: 新規関数を追加する前に
  [es-toolkit](https://es-toolkit.dev/)
  に同等機能がないか必ず確認し、**既にあるものは原則追加しない**
  (追加したい場合は人間に確認)。この repo の価値は「型推論 wrapper + seed
  決定的乱数 + es-toolkit にない業務
  util」に絞る。丸かぶり関数のうち置換ミスが型エラーで検出できるものは
  `@deprecated` 済み、静かな挙動差 (型の緩み・境界値・判定変化) があるものは
  JSDoc の移行検討 NOTE
  のみ。いずれも互換維持のみ行い、機能拡張しない。対象一覧・挙動差・判断基準は
  `docs/ADR-0001-es-toolkit-boundary.md` が正。lodash 互換の網羅を目指さない

### 📂 Code Organization Constraints

- **`libs/`**: 1 関数 (または 1 テーマ) = 1 file、kebab-case 命名。同名の
  `*.test.ts` を必ず隣接させる
- **`main.ts`**: 全 libs の re-export 一覧
  (alphabetical)。関数追加時は必ずここに追記しないと公開されない
- **`build.ts` / `npm/`**: dnt build script と出力先。`npm/`
  は生成物なので直接編集しない (test / lint / fmt からも除外済み)
- **`scripts/` / `mise.toml`**: release フロー (詳細は Versioning / Release
  参照)
- **型 / 境界**: 型のみの utility は `libs/utility-types.ts`
  に集約。型照合ヘルパー (`unionof`, `nameof`) は関数として個別ファイルに置く

### 🛠️ Workflow & Development Rules

- **Secrets**:
  企業名・製品名・機密情報などがあった場合、コード上に残らないように汎用・一般名称に差し替えること。
- **Commit**: `git commit`
  は基本的には人間判断で行うため、指示されたとき以外はコミットせず人間に判断を委ねること。
- **Push / Publish**: `github push` や `npm publish`
  など、外部へ公開・配布する操作は Agent が実行しない。人間が判断して実行する。
- **Testing**: タスク完了前に実行する検証を書く
  - linter / formatter: `deno lint` と `deno fmt` (singleQuote / semicolon
    なし、`npm/` と `README.md` は除外)
  - unit test: `deno task test`。全関数にテスト必須。開発中は `deno task dev`
    (watch)
  - integration: `deno task build` で dnt が CJS/ESM 両方の type check + Node
    実行テストを行うため、release 前の実質的な結合検証を兼ねる
  - bugfix 時: まず再現する failing test を追加してから修正する (fix → test
    の順は不可)
- **Documentation**:
  - 技術的な意思決定や検討は `docs/ADR-XXXX-*.md`
    に記録し、大きな変更の前には既存 ADR を確認する
  - 設計・仕様の検討・決定事項は `docs/SPEC-XXXX-*.md` に記録する
  - 原則、全開発タスクが適切な粒度で `docs/TASK-YYMMDD-*.md` に残るようにする
  - 未着手・保留・トリガー待ちのタスクは `docs/BACKLOG.md`
    に一元管理し、着手時に TASK として切り出す
  - 画像などは `docs/assets/` へ配置してリンクする
- **Versioning / Release**: semver の 0.x 運用 (機能追加 = minor、fix =
  patch)。フローは `README.md` の Release 節が正で、`mise run release:prepare`
  (bump + test/build + publish dry-run) までは Agent 実行可。commit / tag /
  `mise run release:publish` (push + npm publish + GitHub Release) は
  **人間のみ**

## Domains

- `object 系` (objectKeys, objectEntries, objectByKeys, objectIncludes,
  objectSwap, objectKeyByValue, recordBy, groupBy, safeGet 等)
  - この repo の中核。「型推論 wrapper」= 標準 API と同じ挙動で戻り値の型だけ
    narrow するもの、が多い
- `array / number / string 系` (chunk, unique, hasDuplicate, shuffled, range,
  getRank, missingElements, percent, numformat, charCount, isNumber, isUrl,
  isJson 等)
  - es-toolkit と重複が多い領域。丸かぶり分は `@deprecated` または移行検討 NOTE
    済み (ADR-0001 の表参照) で、新規追加は原則行わない
- `random / async / type-level 系` (lcg, hashBySeed, randomInt / sleepTimer,
  waitUntilOrFail, remainingSeconds / utility-types, unionof, nameof)
  - 乱数系は seed 決定的 (テスト容易性のため)。type-level は `utility-types.ts`
    に集約
