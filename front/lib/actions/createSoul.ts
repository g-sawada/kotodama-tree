/**
 * use server ディレクティブを使用した，コトダマ作成アクション
 *
 */

"use server";

import { redirect } from "next/navigation";
import { createSoul } from "../api/soul/createSoul";


// 手持ちのコトダマ一覧を取得するアクション
export async function createSoulAction(formData: FormData) {
  // セッションからユーザーIDを取得予定
  // const session = await auth();
  // const user_id = session.id
  const user_id = "abc"
  const content = formData.get("content") as string;
  const tree_id = formData.get("tree_id") as string;
  const owner_id = user_id
  const creator_id = user_id
  const home_tree_id = tree_id
  const captured_tree_id = tree_id
  try {
    await createSoul(content, owner_id, creator_id, home_tree_id, captured_tree_id);
  } catch (error) {
    console.error("投稿失敗:", error);
  }
  redirect("/mock");
}