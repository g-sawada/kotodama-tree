"use server"

import { setFlash } from "@/lib/api/flash/setFlash";
import { redirect } from "next/navigation";
import { harvestSoul } from "../api/soul/harvestSoul";

type Props = {
  soulId: number;
  roomId: string;
}

export default async function harvestSoulAction({soulId, roomId}: Props) {
  // セッションからユーザーIDを取得
  // const session = await auth();
  // const user = await getUserInfo(session.userId);
  // const creator_id = user.id
  // const soul_id = soulId;
  // const room_id = roomId;
  const soul_id = 79;
  const user_id = "abc"
  const room_id = "abc"

  const result = await harvestSoul(soul_id, user_id, room_id);
  console.log("result");
  console.log(result);

  if (!result.isOk) {
    console.error("エラーが発生しました");
    redirect("/signup");
  }

  console.log("しゅうかくに成功しました");
  await setFlash("success", "しゅうかくに成功しました");
  redirect("/loggedIn");
} 