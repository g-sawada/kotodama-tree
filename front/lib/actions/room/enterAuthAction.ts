'use server'

import { auth } from "@/auth";
import { enterAuth } from "@/lib/api/room/enterAuth";

export default async function enterAuthAction(roomId: string) {

  const session = await auth();
  // エラー処理
  if(!session?.user?.userId) {
    return
  }
  const userId = session.user.userId;

  const result = await enterAuth(userId, roomId);
  if(!result.isOk) {
    // エラー処理未実装。userのlast_visit_roomにリダイレクトする共通処理を実装して実行
    console.log(result.body.error)
    return
  }
  
  return result.body.data.canEnter;
} 