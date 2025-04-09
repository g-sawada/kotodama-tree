"use server"

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { patchFetch } from "@/lib/api/fetcher/patchFetch";
import { setFlash } from "@/lib/api/flash/setFlash";
import { Soul } from "@/types/soul";
import redirectToLastVisitRoomAction from "../user/redirectToLastVisitRoom";

/**
 * API souls#offerをコールする。ユーザーの作成実行により起動するため，サーバーアクションとして実装
 * @param soulId - コトダマのID
 * @param roomId - ユーザーの現在地の部屋ID
 * @returns Promise<Soul[]>
 */
export default async function offerSoulAction(soulId: number, roomId: string) {
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
    `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/souls/${soulId}/offer`,
    reqBody
  );

  if (!result.isOk) {
    redirectToLastVisitRoomAction({ errorMessage: result.body.error });
  }

  await setFlash("success", "コトダマを捧げました");

  // 仮実装としてメイン画面にリダイレクト。捧げページでアニメーションを実装予定
  redirect(`/m/${roomId}`);
}
