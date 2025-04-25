"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import redirectToLastVisitRoomAction from "../user/redirectToLastVisitRoom";
import { setFlashAction } from "@/lib/actions/flash/setFlashAction";
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
  if(!session?.user?.userId) {
    await setFlashAction("error", "ユーザー情報の取得に失敗しました。\n 再ログインして下さい。")
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

  /**
   * コトダマ作成 API souls#create を実行
   * @param content - コトダマ本文
   * @param creator_id - ログインユーザーID
   * 
   * 正常系
   * - 新しいコトダマを作成 (201 Created)
   *   @returns data :Soul  作成したコトダマ
   * 異常系
   * - ユーザーのlast_visit_roomがユーザー自身のroomでない (403 Forbidden)
   * - ユーザーのコトダマ作成上限数を超えている (409 Conflict)
   * - soul.saveに失敗 (422 Unprocessable Entity)
   * - その他のエラー (500 Internal Server Error)
   */

  const result = await postFetch<Soul>(
    `/souls`,
    reqBody
  );

  if(!result.isOk) {
    if(result.status ===  403 || result.status === 409 || result.status === 422) {
      await setFlashAction("error", "コトダマの作成に失敗しました。");
      await redirectToLastVisitRoomAction();
      return;
    } else {
      // その他のエラー
      await setFlashAction("error", "予期しないエラーが発生しました。");
      redirect("/");
    }
  }

  await setFlashAction("success", "新しいコトダマを捧げました。");
  // TODO: アニメーションの実装
  await redirectToLastVisitRoomAction();
}