"use server"

import { auth } from "@/auth";
import { deleteFetch } from "@/lib/api/fetcher/deleteFetch";
import { Favorite } from "@/types/favorite";
import { redirect } from "next/navigation";
import { setFlashAction } from "../flash/setFlashAction";

/**
 * コトダマカードのいいね済みボタンから起動し，API favorites#destroyをコールする。
 * @param soul_id - いいね解除する対象のsoul_id
 */

export default async function destroyFavoriteAction(soul_id: number) {
  // セッションからユーザーIDを取得
  const session = await auth();
  if(!session?.user?.userId) {
    await setFlashAction("error", "ユーザー情報の取得に失敗しました。\n 再ログインして下さい。")
    redirect("/login");
  }
  const user_id = session.user.userId;

  // リクエストボディを作成
  const reqBody = {
    user_id: user_id
  }

  /**
   * お気に入り解除 API favorites#destroy を実行
   * @param soul_id - 対象コトダマのID
   * @param user_id - ログインユーザーID
   * 
   * 正常系
   * - favoriteデータを作成 (201 Created)
   *   @returns data :Favorite  作成したfavoriteデータ
   * 異常系
   * - コトダマが存在しない (404 Not Found)   // ⭐️ 0425 TODO　APIにNot Foundを実装する
   * - すでにお気に入り済み (409 Conflict)
   * - その他のエラー (500 Internal Server Error)
   */
  const result = await deleteFetch<Favorite>(
    `/souls/${soul_id}/favorites`,
    reqBody
  )
  if(!result.isOk && result.status === 500) {
    // 500エラーの場合，予期しないエラーとしてトップページにリダイレクト
    await setFlashAction("error", "予期しないエラーが発生しました。")
    redirect("/");
  }
  // 500エラー以外はクライアントで処理する
  return result;
}