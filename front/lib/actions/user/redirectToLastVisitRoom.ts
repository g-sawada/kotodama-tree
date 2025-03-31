'use server'

import { auth } from "@/auth";
import { setFlash } from "@/lib/api/flash/setFlash";
import { getUser } from "@/lib/api/user/getUser";
import { redirect } from "next/navigation";

/**
 * ユーザーのlast_visit_roomにリダイレクトする共通ロジック
 * paramでエラーメッセージを任意で受け取り，フラッシュメッセージにセットする
 * @param errorMessage エラーメッセージ(任意)
 * 
 */

interface RedirectToLastVisitRoomActionParam {
  errorMessage?: string;
}

export default async function redirectToLastVisitRoomAction(
  param?: RedirectToLastVisitRoomActionParam
) {
  const session = await auth();
  // sessionが取得できない場合はログインページへリダイレクト
  if (!session?.user.userId) { 
    redirect("/login");
  }
  const userId = session.user.userId;
  
  // ユーザー情報を取得
  const result = await getUser(userId);

  // エラーの場合またはlast_visit_roomがnullの場合はログインページへリダイレクト
  if(!result.isOk || result.body.data.last_visit_room === null) {
    redirect("/");
  }

  // ユーザーのlast_visit_roomにリダイレクト
  const lastVisitRoomId = result.body.data.last_visit_room;
  if(param?.errorMessage) {
    const errorMessage = param.errorMessage;
    setFlash("error", errorMessage);
  }
  redirect(`/m/${lastVisitRoomId}`);
}