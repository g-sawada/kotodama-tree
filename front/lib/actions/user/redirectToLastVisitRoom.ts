'use server'

import { auth } from "@/auth";
import { setFlashAction } from "@/lib/actions/flash/setFlashAction";
import { getUser } from "@/lib/api/user/getUser";
import { redirect } from "next/navigation";
import userMoveAction from "./userMoveAction";

// ⭐️ paramでエラーメッセージを受け取らないようにする

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
  if (!session || !session.user.userId) {
    await setFlashAction("error", "ユーザー情報の取得に失敗しました。\n 再ログインして下さい。")
    return redirect("/login");
  }
  const userId = session.user.userId;
  
  // ユーザー情報を取得
  const getUserResult = await getUser(userId);
  if (!getUserResult.isOk) {
    await setFlashAction("error", "ユーザー情報の取得に失敗しました。\n 再ログインして下さい。")
    return redirect("/login");
  }
  const user = getUserResult.body.data;

  // ユーザーのlast_visit_roomにリダイレクト
  const lastVisitRoomId = user.last_visit_room;
  
  // ⭐️ paramでエラーメッセージを受け取らないようにする
  if(param?.errorMessage) {
    const errorMessage = param.errorMessage;
    setFlashAction("error", errorMessage);
  }

  // last_visit_roomがnullの場合（初回登録 または 世界リセット直後）
  // 部屋移動アクションをuserのroom_idで実行
  if (lastVisitRoomId === null) {
    await userMoveAction(user.room_id)
    return;
  }

  redirect(`/m/${lastVisitRoomId}`);
}