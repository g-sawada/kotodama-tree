"use server"

import { postFetch } from "@/lib/api/fetcher/postFetch";
import { Favorite } from "@/types/favorite";

/**
 * コトダマカードの空のいいねボタンから起動し，API favorites#createをコールする。
 * @param soul_id - いいねする対象のコトダマのsoul_id
 */


export default async function createFavoriteAction(soul_id: number) {
  // セッションからuser_idを取得
  // const session = await auth();
  // const user_id = session.userId;
  const user_id = "6aae335d-6f04-4a04-a0ed-d3877cc53d49"


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