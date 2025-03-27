/**
 * use server ディレクティブを使用した，コトダマ作成アクション
 *
 */

"use server";

import { redirect } from "next/navigation";
import { createSoul } from "../api/soul/createSoul";


// 手持ちのコトダマ一覧を取得するアクション
export async function createSoulAction(formData: FormData) {
  // セッションからユーザーIDを取得
  // const session = await auth();
  // const user = await getUserInfo(session.userId);
  // const creator_id = user.id

  const creator_id = "abc"
  const content = formData.get("content") as string;

  console.log(`createSoulAction発動。content：${content}`) //アクション動作確認用
  // try {
  //   await createSoul(content, creator_id);
  // } catch (error) {
  //   console.error("コトダマ作成失敗:", error);
  // }
  // 捧げアニメーションのあと、メイン画面へ
  // redirect("/mock");
}