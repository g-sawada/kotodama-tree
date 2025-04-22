"use server"

import { auth } from "@/auth";
import { deleteFetch } from "@/lib/api/fetcher/deleteFetch";
import { Favorite } from "@/types/favorite";
import { redirect } from "next/navigation";

/**
 * コトダマカードのいいね済みボタンから起動し，API favorites#destroyをコールする。
 * @param soul_id - いいね解除する対象のsoul_id
 */

export default async function destroyFavoriteAction(soul_id: number) {
  // セッションからuser_idを取得
  const session = await auth();
  if(!session?.user?.userId) {
    redirect("/login");
  }
  const user_id = session.user.userId;

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