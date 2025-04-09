'use server'

import { auth } from "@/auth";
import { postFetch } from "@/lib/api/fetcher/postFetch";
import redirectToLastVisitRoomAction from "../user/redirectToLastVisitRoom";

interface EnterAuthResponse {
  canEnter: boolean;
}

export default async function enterAuthAction(roomId: string) {
  const session = await auth();
  // エラー処理
  if(!session?.user?.userId) {
    return
  }
  const userId = session.user.userId;

  // リクエストボディを作成
  const reqBody = {
    user_id: userId,
  };

  const result = await postFetch<EnterAuthResponse>(
    `/rooms/${roomId}/enter`,
    reqBody,
  )

  // APIコールにエラーがあった場合
  if(!result.isOk) {
    await redirectToLastVisitRoomAction({ errorMessage: result.body.error })
    return;
  }
  
  // 入室可否判定の結果を返却
  return result.body.data.canEnter;
} 