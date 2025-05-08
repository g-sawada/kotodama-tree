"use server"

import { redirect } from "next/navigation";
import { postFetch } from "@/lib/api/fetcher/postFetch";
import { setFlashAction } from "@/lib/actions/flash/setFlashAction";
import { User } from "@/types/user";
import redirectToLastVisitRoomAction from "./redirectToLastVisitRoom";

/**
 * ユーザー新規登録ページのフォーム送信から起動し，API users#createをコールする。
 * ユーザーの作成実行により起動するため，サーバーアクションとして実装
 * @param formData - 作成フォームのデータ
 */

export default async function createUserAction(formData: FormData) {
  const name = formData.get("name") as string;
  const provider = formData.get("provider") as string;
  const provider_id = formData.get("provider_id") as string;

  if(!name) {
    await setFlashAction("error", "ユーザー名を入力してください");
    redirect("/signup");
  }

  // リクエストボディを作成
  const reqBody = {
    name: name,
    provider: provider,
    provider_id: provider_id,
  }

  // APIをコール
  const result = await postFetch<User>(
    `/users`,
    reqBody
  )
  
  if (!result.isOk) {
    console.error("ユーザーの作成時にエラーが発生しました");
    redirect("/signup");
  }

  await setFlashAction("success", "ユーザーの作成に成功しました");
  await redirectToLastVisitRoomAction();
  return;
} 