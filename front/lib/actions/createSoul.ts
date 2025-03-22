/**
 * use server ディレクティブを使用した，コトダマ作成アクション
 *
 */

"use server";

import { redirect } from "next/navigation";
import { createSoul } from "../api/soul/createSoul";


// 手持ちのコトダマ一覧を取得するアクション
export async function createSoulAction(formData: FormData) {
  // セッションからユーザーIDを取得、ユーザーIDとユーザーのキのIDを取得予定
  // const session = await auth();
  // const user = await getUserInfo(session.userId);
  // const user_id = user.id
  // const tree_id = user.tree.id
  const user_id = "abc"
  const tree_id = "123"
  const content = formData.get("content") as string;

  const owner_id = user_id
  const creator_id = user_id
  const home_tree_id = tree_id
  const captured_tree_id = tree_id
  console.log(`createSoulAction発動。content：${content}、tree_id：${tree_id}`) //アクション動作確認用
  // try {
  //   await createSoul(content, owner_id, creator_id, home_tree_id, captured_tree_id);
  // } catch (error) {
  //   console.error("コトダマ作成失敗:", error);
  // }
  // 捧げアニメーションのあと、メイン画面へ
  // redirect("/mock");
}