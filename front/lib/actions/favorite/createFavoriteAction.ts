"use server"

import { auth } from "@/auth";
import { postFetch } from "@/lib/api/fetcher/postFetch";
import { Favorite } from "@/types/favorite";

/**
 * コトダマカードの空のいいねボタンから起動し，API favorites#createをコールする。
 * @param soul_id - いいねする対象のコトダマのsoul_id
 */


export default async function createFavoriteAction(soul_id: number) {
  // セッションからuser_idを取得
  const session = await auth();
  const user_id = session.userId;

  // リクエストボディを作成
  const reqBody = {
    user_id: user_id
  }

  // APIをコール
  const result = await postFetch<Favorite>(
    `/souls/${soul_id}/favorites`,
    reqBody
  )

  return result;

}