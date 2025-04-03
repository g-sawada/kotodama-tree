"use server"

import { getSouls } from "@/lib/api/soul/getSouls";

/**
 * コトダマ取得アクション
 * fetch関数 getSouls.tsをコールして，コトダマ一覧を取得する
 * @param owner_id コトダマの所有者のuser_id
 * @param creator_id コトダマの作成者のuser_id
 * @param captured_tree_id コトダマが捧げられているtreeのid
 * @returns Soul[]
 */

interface getSoulsParams {
  owner_id?: string;
  creator_id?: string;
  captured_tree_id?: number;
}

export default async function getSoulsAction({
  owner_id,
  creator_id,
  captured_tree_id,
}: getSoulsParams) {

  if(!owner_id && !creator_id && !captured_tree_id) {
    throw new Error('getSoulsAction: 最低1つのパラメータを指定してください');
  }

  const result = await getSouls({ owner_id, creator_id, captured_tree_id });
  
  // NOTE: コトダマ取得APIが失敗した場合の処理は議論の必要あり
  // 1. エラーページやトップページにリダイレクトするのか
  // 2. クライアント側までエラーを返し，フラッシュメッセージを表示させるのか
  if (!result.isOk) {
    throw new Error(`getSoulsAction: データの取得に失敗しました`);
  }

  const souls = result.body.data;
  return souls;
} 