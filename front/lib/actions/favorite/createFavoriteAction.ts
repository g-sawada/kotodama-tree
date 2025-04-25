"use server"

import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { postFetch } from "@/lib/api/fetcher/postFetch";
import { setFlashAction } from "../flash/setFlashAction";
import { Favorite } from "@/types/favorite";

/**
 * コトダマカードの空のいいねボタンから起動し，API favorites#createをコールする。
 * @param soul_id - いいねする対象のコトダマのsoul_id
 */

export default async function createFavoriteAction(soul_id: number) {
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
   * お気に入り登録 API favorites#create を実行
   * @param soul_id - 対象コトダマのID
   * @param user_id - ログインユーザーID
   * 
   * 正常系
   * - favoriteデータを作成 (201 Created)
   *   @returns data :Favorite  作成したfavoriteデータ
   * 異常系
   * - コトダマが存在しない (404 Not Found)
   * - すでにお気に入り済み (409 Conflict)
   * - その他のエラー (500 Internal Server Error)
   */
  const result = await postFetch<Favorite>(
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