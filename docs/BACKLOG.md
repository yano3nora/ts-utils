# Backlogs — 未解決／積み残しタスク

> **Status: 常設
> (クローズしない)**。未着手・保留・トリガー待ちのタスクを一元管理する唯一の置き場。
> 各 TASK の残項目はここに集約済みなので、過去 TASK を漁る必要はない。

## 運用ルール

1. 次の作業を始めるときは、ここから 1 件 pick して `TASK-YYMMDD-<slug>.md`
   を新規作成する
2. pick した項目は新 TASK
   へのリンクに差し替え、完了したらリンクごと項目を削除する
3. 新しい未解決事項が出たら、他の TASK
   には「BACKLOGへ追加」だけ書いてここへ追記する
4. ADR, SPEC の Open Questions と重複する項目は、決着時に ADR, SPEC
   側も更新すること

## 未着手

- **GitHub issue #2 (v1.0.0) 対応**:
  https://github.com/yano3nora/ts-utils/issues/2
  - npm publish の 2FA 運用整理 / gist に散在する utils の取り込み /
    formatter・型推論まわりの修正。詳細は issue 本文が正
- **jsr への公開 + JSDoc 改良**: 廃止された deno.land/x (旧 denoland registry)
  の代替として [jsr](https://jsr.io/) へ公開する
  - JSDoc を改良し、jsr の自動生成ドキュメントだけで開発メンバーが API 一覧 +
    example を読み取れる状態にする
  - README の API References リンク (deno.land/x) を jsr へ差し替える
