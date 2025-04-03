"use server"

import { setFlash } from "@/lib/api/flash/setFlash";
import { redirect } from "next/navigation";
import { offerSoul } from "../../api/soul/offerSoul";
import { auth } from "@/auth";
import redirectToLastVisitRoomAction from "../user/redirectToLastVisitRoom";

type Props = {
  soulId: number;
  roomId: string;
}

export default async function offerSoulAction({soulId, roomId}: Props) {
  // sessionからuserIdを取得。取得できない場合はloginページにリダイレクト
  const session = await auth();
  if (!session || !session.user.userId) {
    redirect("/login");
  }
  const userId = session.user.userId;

  const result = await offerSoul(soulId, userId, roomId);

  if (!result.isOk) {
    redirectToLastVisitRoomAction({ errorMessage: result.body.error });
  }

  await setFlash("success", "コトダマを捧げました");

  // TODO: 成功時はreturnしてクライアント側でアニメーション処理を実行予定
  redirect(`/m/${roomId}/offer`);
}
