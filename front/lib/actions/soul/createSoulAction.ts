"use server";

import { auth } from "@/auth";
import { createSoul } from "@/lib/api/soul/createSoul";
import { redirect } from "next/navigation";
import redirectToLastVisitRoomAction from "../user/redirectToLastVisitRoom";
import { setFlash } from "@/lib/api/flash/setFlash";

// 手持ちのコトダマ一覧を取得するアクション
export async function createSoulAction(formData: FormData) {
  // セッションからユーザーIDを取得
  const session = await auth();
  if (!session || !session.user.userId) {
    redirect("/login");
  }
  const userId = session.user.userId;

  // フォームデータの入力を取得
  const content = formData.get("content") as string;

  // コトダマ作成APIを実行
  const result = await createSoul(content, userId);

  if(!result.isOk) {
    // エラー処理未実装。userのlast_visit_roomにリダイレクトする共通処理を実装して実行
    console.error("コトダマの作成時にエラーが発生しました");
    redirectToLastVisitRoomAction({ errorMessage: result.body.error });
  }

  await setFlash("success", "新しいコトダマを捧げました");
  
  // 仮実装。捧げアニメーションのあと、メイン画面へ
  await redirectToLastVisitRoomAction()
}