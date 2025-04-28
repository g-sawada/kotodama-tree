"use server"

import { auth } from "@/auth"
import { redirect } from "next/navigation";
import { patchFetch } from "@/lib/api/fetcher/patchFetch";
import redirectToLastVisitRoomAction from "./redirectToLastVisitRoom";
import { setFlashAction } from "@/lib/actions/flash/setFlashAction";

/**
 * ユーザーの部屋移動処理を実行するサーバーアクション
 * @param targetRoomId 
 */

interface RoomId {
  room_id: string;
}

export default async function userMoveAction(targetRoomId: string) {
  // セッションからユーザーIDを取得
  const session = await auth();
  // 取得できない場合はエラーとしてリダイレクト
  if (!session || !session.user.userId) {
    await setFlashAction("error", "ユーザー情報の取得に失敗しました。\n 再ログインして下さい。")
    redirect("/login");
  }
  const userId = session.user.userId;

  // リクエストボディを作成
  const reqBody =  {
    room_id: targetRoomId,
  }

  /**
   * ユーザー移動API users#move を実行
   * 
   * 正常系
   * - 移動に成功，または既に移動済みの場合(200 OK)
   *   @returns data.room_id :string    移動先の部屋ID
   * 異常系
   * - アクセス権無し(403 Forbidden)
   * - ユーザーまたは部屋が存在しない(404 Not Found)
   * - その他のエラー(500 Internal Server Error)
   */
  const result = await patchFetch<RoomId>(
    `/users/${userId}/move`,
    reqBody,
  )

  if(!result.isOk) {
    if(result.status === 403) {
      // アクセス権無し(403 Forbidden)
      await setFlashAction("error", "移動に失敗しました。\n 最後に訪れた場所を読み込みました。")
      // ユーザーのlast_visit_roomにリダイレクト
      await redirectToLastVisitRoomAction(); 
    } else {
      // その他のエラー
      await setFlashAction("error", "予期しないエラーが発生しました。")
      redirect("/");
    }
  } else {
    // 成功した場合は移動先の部屋にリダイレクト
    redirect(`/m/${result.body.data.room_id}`);
  }
}