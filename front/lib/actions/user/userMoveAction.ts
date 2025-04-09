"use server"

import { auth } from "@/auth"
import { redirect } from "next/navigation";
import { patchFetch } from "@/lib/api/fetcher/patchFetch";
import redirectToLastVisitRoomAction from "./redirectToLastVisitRoom";

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
  // 仮実装。sessionが取得できない場合はエラーとしてリダイレクト
  if (!session?.user.userId) { 
    return redirect("/login");
  }
  const userId = session.user.userId;

  // リクエストボディを作成
  const reqBody =  {
    room_id: targetRoomId,
  }

  // ユーザー移動APIを実行
  // 成功時は移動先の部屋IDがdataで返る
  const result = await patchFetch<RoomId>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/users/${userId}/move`,
    reqBody,
  )

  if(!result.isOk) {
    // エラー処理未実装。userのlast_visit_roomにリダイレクトする共通処理を実装して実行
    console.log(result.body.error)
    await redirectToLastVisitRoomAction(); // ユーザーのlast_visit_roomにリダイレクト
    return
  }

  // 成功した場合は移動先の部屋にリダイレクト
  redirect(`/m/${result.body.data.room_id}`) // 成功した場合は移動先の部屋にリダイレクト
}