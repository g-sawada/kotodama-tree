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
  const user_id = "20e38594-c420-424c-9e1a-456599049e09"


  // リクエストボディを作成
  const reqBody = {
    user_id: user_id
  }

  // APIをコール
  const result = await postFetch<Favorite>(
    `/souls/${soul_id}/favorites`,
    reqBody
  )

  if (!result.isOk) {
    console.error("いいね実行時にエラーが発生しました");
  }

}