/**
 * use server ディレクティブを使用した，コトダマ捧げアクション
 *
 */

"use server";

// import { redirect } from "next/navigation";
// import { offerSoul } from "../api/soul/offerSoul";

export async function offerSoulAction(
  soul_id: number,
  captured_tree_id: string
) {
  console.log("offerSoulAction発動") //アクション動作確認用
  // try {
  //   await offerSoul(soul_id, captured_tree_id);
  // } catch (error) {
  //   console.error("捧げ失敗:", error);
  // }
  // コトダマ捧げアニメーションのあと、メイン画面へ
  // redirect("/mock");
}
