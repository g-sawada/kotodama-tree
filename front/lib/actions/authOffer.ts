/**
 * use server ディレクティブを使用した，捧げページへのアクセス権限を確認するためのアクション
 * @param room_uuid 現在滞在中の部屋のid
 * @param user_uuid ログイン中ユーザーのid
 */

"use server";

import { redirect } from "next/navigation";
// import { authOffer } from "../api/room/authOffer";
// import { auth } from "@/auth";

export async function authOfferAction(room_uuid: string) {
  // const session = await auth();
  // const user_uuid = session.id
  // const isAuthorized = await authOffer(room_uuid, user_uuid);
  const isAuthorized = true;
  isAuthorized ? redirect("/mock/offer") : redirect("/mock"); // 処理方法検討中
}
