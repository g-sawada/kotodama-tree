'use server'

import { auth } from "@/auth";
import { postFetch } from "@/lib/api/fetcher/postFetch";
import { setFlash } from "@/lib/api/flash/setFlash";
import { redirect } from "next/navigation";
import redirectToLastVisitRoomAction from "../user/redirectToLastVisitRoom";

interface EnterAuthResponse {
  canEnter: boolean;
}

export default async function enterAuthAction(roomId: string) {
  const session = await auth();
  // 取得できない場合はエラーとしてリダイレクト
  if(!session?.user?.userId) {
    await setFlash("error", "ユーザー情報の取得に失敗しました。\n 再ログインして下さい。")
    redirect("/login");
  }
  const userId = session.user.userId;

  // リクエストボディを作成
  const reqBody = {
    user_id: userId,
  };

  /**
   * 部屋入室認証 API rooms#enter を実行
   * 
   * 正常系
   * - ログインユーザーのlast_visit_roomがパラメータの部屋IDと一致するかどうかを判定する (200 OK)
   *   @returns data.canEnter :boolean    入室可否
   * 異常系
   * - ユーザーまたは部屋が存在しない(404 Not Found)
   * - その他のエラー(500 Internal Server Error)
   */
  const result = await postFetch<EnterAuthResponse>(
    `/rooms/${roomId}/enter`,
    reqBody,
  )

  if(!result.isOk) {
    if(result.status === 404) {
      // ユーザーが存在しない(404 Not Found)
      if(result.body.error === "user not found") {
        await setFlash("error", "ユーザー情報の取得に失敗しました。\n 再ログインして下さい。")
        redirect("/login");
      }
      // 部屋が存在しない(404 Not Found)
      if(result.body.error === "room not found") {
        await setFlash("error", "アクセスできません。\n 最後に訪れた場所を読み込みました。");
        await redirectToLastVisitRoomAction();
        return;
      }
    } else {
      // その他のエラー
      await setFlash("error", "予期しないエラーが発生しました。")
      redirect("/");
    }
  } else {
    // 入室可否判定の結果を返却
    return result.body.data.canEnter;
  }
} 