"use server"

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Tree } from "@/types/tree";
import { patchFetch } from "@/lib/api/fetcher/patchFetch";
import { setFlashAction } from "@/lib/actions/flash/setFlashAction";

/**
 * API trees#chargeをコールする。ユーザーの作成実行により起動するため，サーバーアクションとして実装
 * @param treeId - キのID
 * @returns Promise<ChargeResponse>
 */

interface ChargeResponse {
  tree: Tree;
  level_updated: boolean;
}

export default async function chargeAction(treeId: number) {
  // sessionからuserIdを取得。取得できない場合はloginページにリダイレクト
  const session = await auth();
  if (!session || !session.user.userId) {
    redirect("/login");
  }
  const userId = session.user.userId;

  // リクエストボディを作成
  const reqBody = {
    user_id: userId,
  };

  // APIをコール
  const result = await patchFetch<ChargeResponse>(
    `/trees/${treeId}/charge`,
    reqBody
  );

  if (!result.isOk) {
    await setFlashAction("error", "チャージに失敗しました");
    return result;
  }

  let successMsg = "キにコトダマのチカラをチャージしました。";
  if (result.body.data.level_updated) {
    successMsg += `\nキのレベルが${result.body.data.tree.level}になりました。`;
  }

  await setFlashAction("success", successMsg);
  return result;
}
