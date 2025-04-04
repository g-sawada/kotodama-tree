"use server"

import { setFlash } from "@/lib/api/flash/setFlash";
import { redirect } from "next/navigation";
import { offerSoul } from "../../api/soul/offerSoul";
import { auth } from "@/auth";
import redirectToLastVisitRoomAction from "../user/redirectToLastVisitRoom";

export default async function offerSoulAction(soulId: number, roomId: string) {
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

  // 仮実装としてメイン画面にリダイレクト。捧げページでアニメーションを実装予定
  redirect(`/m/${roomId}`);
}
