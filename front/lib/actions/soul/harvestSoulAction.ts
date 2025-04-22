"use server"

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { patchFetch } from "@/lib/api/fetcher/patchFetch";
import { setFlashAction } from "@/lib/actions/flash/setFlashAction";
import { Soul } from "@/types/soul";
import redirectToLastVisitRoomAction from "../user/redirectToLastVisitRoom";

/**
 * API souls#harvestをコールする。ユーザーの作成実行により起動するため，サーバーアクションとして実装
 * @param soulId - コトダマのID
 * @param roomId - ユーザーの現在地の部屋ID
 * @returns Promise<Soul>
 */
export default async function harvestSoulAction(soulId: number, roomId: string) {
  // sessionからuserIdを取得。取得できない場合はloginページにリダイレクト
  const session = await auth();
  if (!session || !session.user.userId) {
    redirect("/login");
  }
  const userId = session.user.userId;

  // リクエストボディを作成
  const reqBody = {
    user_id: userId,
    room_id: roomId,
  };

  // APIをコール
  const result = await patchFetch<Soul>(
    `/souls/${soulId}/harvest`,
    reqBody
  );

  if (!result.isOk) {
    redirectToLastVisitRoomAction({ errorMessage: result.body.error });
    return;
  }

  await setFlashAction("success", "コトダマを収穫しました");

  return result
}
