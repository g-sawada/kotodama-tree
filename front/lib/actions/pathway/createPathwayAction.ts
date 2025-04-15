"use server"

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { setFlash } from "@/lib/api/flash/setFlash";
import { getUser } from "@/lib/api/user/getUser";
import { postFetch } from "@/lib/api/fetcher/postFetch";
import { Pathway } from "@/types/pathway";
import redirectToLastVisitRoomAction from "../user/redirectToLastVisitRoom";

export default async function createPathwayAction(visitRoomId: string) {
  // セッションからユーザーIDを取得、ホームの部屋のroom_idを取得
  const session = await auth();
  if (!session || !session.user.userId) {
    redirect("/login");
  }
  const userId = session.user.userId;

  // 最新のユーザー情報を取得
  const user = await getUser(userId);
  // 最終訪問部屋のidと現在の部屋のidが一致しない場合はエラー
  if (user.last_visit_room !== visitRoomId) {
    await setFlash("error", "アクセス権がありません");
    redirectToLastVisitRoomAction();
  }

  // リクエストボディを作成
  const reqBody = {
    room_1_id: user.room_id,
    room_2_id: visitRoomId,
  };

  // APIをコール
  const result = await postFetch<Pathway>(
    `/pathways`,
    reqBody
  );

  // 結果はクライアントで処理
  return result;
} 