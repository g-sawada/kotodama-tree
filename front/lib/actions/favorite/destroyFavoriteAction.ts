"use server"

import { deleteFetch } from "@/lib/api/fetcher/deleteFetch";
import { Favorite } from "@/types/favorite";

/**
 * コトダマカードのいいね済みボタンから起動し，API favorites#destroyをコールする。
 * @param soul_id - いいね解除する対象のsoul_id
 */

export default async function destroyFavoriteAction(soul_id: number) {
  // セッションからuser_idを取得
  // const session = await auth();
  // const user_id = session.userId;
  const user_id = "6aae335d-6f04-4a04-a0ed-d3877cc53d49"

  // リクエストボディを作成
  const reqBody = {
    user_id: user_id
  }

  // APIをコール
  const result = await deleteFetch<Favorite>(
    `/souls/${soul_id}/favorites`,
    reqBody
  )

  return result;

}