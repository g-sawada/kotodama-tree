"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import redirectToLastVisitRoomAction from "../user/redirectToLastVisitRoom";
import { setFlash } from "@/lib/api/flash/setFlash";
import { postFetch } from "@/lib/api/fetcher/postFetch";
import { Soul } from "@/types/soul";

/**
 * API souls#createをコールする。ユーザーの作成実行により起動するため，サーバーアクションとして実装
 * @param formData - 作成フォームのデータ
 * @returns Promise<Soul[]>
 */

export async function createSoulAction(formData: FormData) {
  // セッションからユーザーIDを取得
  const session = await auth();
  if (!session || !session.user.userId) {
    redirect("/login");
  }
  const userId = session.user.userId;

  // フォームデータの入力を取得
  const content = formData.get("content") as string;

  // リクエストボディを作成
  const reqBody = {
    soul: {
      content: content,
      creator_id: userId,
    },
  }

  const result = await postFetch<Soul>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/souls`,
    reqBody
  );

  if(!result.isOk) {
    // エラー処理未実装。userのlast_visit_roomにリダイレクトする共通処理を実装して実行
    console.error("コトダマの作成時にエラーが発生しました");
    redirectToLastVisitRoomAction({ errorMessage: result.body.error });
  }

  await setFlash("success", "新しいコトダマを捧げました");
  
  // 仮実装。捧げアニメーションのあと、メイン画面へ
  await redirectToLastVisitRoomAction()
}