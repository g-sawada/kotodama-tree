"use server"

import { setFlash } from "@/lib/api/flash/setFlash";
import { redirect } from "next/navigation";
import { createPathway } from "@/lib/api/pathway/createPathway";

type Props = {
  room1Id: number; // 現在訪れている部屋のroom_id
}

export default async function createPathwayAction({room1Id}: Props) {
  // セッションからユーザーIDを取得、ホームの部屋のroom_idを取得
  // const session = await auth();
  // const user = await getUserInfo(session.userId);
  // const room_2_id = user.room.id;
  const room_1_id = "cdf" // propsで受け取ったroom1Idを利用予定
  const room_2_id = "abc"

  const result = await createPathway(room_1_id, room_2_id);
  console.log("result");
  console.log(result);

  if (!result.isOk) {
    console.error("エラーが発生しました");
    redirect("/signup");
  }

  console.log("ホームへのポータルを作成しました");
  await setFlash("success", "ホームへのポータルを作成しました");
  redirect("/loggedIn");
} 