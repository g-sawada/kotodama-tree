"use server"

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { patchFetch } from "@/lib/api/fetcher/patchFetch";
import { setFlashAction } from "@/lib/actions/flash/setFlashAction";
import { Soul } from "@/types/soul";
import redirectToLastVisitRoomAction from "../user/redirectToLastVisitRoom";

/**
 * API souls#offerをコールする。ユーザーの作成実行により起動するため，サーバーアクションとして実装
 * @param soulId - コトダマのID
 * @param roomId - ユーザーの現在地の部屋ID
 * @returns Promise<Soul[]>
 */
export default async function offerSoulAction(soulId: number, roomId: string) {
  // sessionからuserIdを取得。取得できない場合はloginページにリダイレクト
  const session = await auth();
  if (!session || !session.user.userId) {
    redirect("/login");
  }
  const userId = session.user.userId;

  // リクエストボディを作成
  const reqBody = {
    user_id: userId,
    room_id: roomId,
  };

  /**
   * コトダマ捧げ API souls#offer を実行
   * @param soulId - 捧げるコトダマのID
   * @param user_id - ログインユーザーID
   * @param room_id - ユーザーの現在地の部屋ID
   * 
   * 正常系
   * - コトダマ捧げ処理を実行 (200 OK)
   *   @returns data :Soul  捧げたコトダマ
   * 異常系
   * - 処理対象のコトダマが存在しない (404 Not Found)
   * - ユーザーのlast_visit_roomが現在訪れている部屋でない (403 Forbidden)
   * - ユーザーの手持ちコトダマに対象のsoulがない (409 Conflict)
   * - その他のエラー (500 Internal Server Error)
   */
  const result = await patchFetch<Soul>(
    `/souls/${soulId}/offer`,
    reqBody
  );

  if (!result.isOk) {
    if (result.status === 403 || result.status === 404) {
      // ユーザーのlast_visit_roomが現在訪れている部屋でない (403 Forbidden)　
      // または処理対象のコトダマが存在しない (404 Not Found)
      await setFlashAction("error", "コトダマを捧げられません。\n 最後に訪れた場所を読み込みました。");
      await redirectToLastVisitRoomAction();
      return;
    } else if (result.status === 409) {
      // ユーザーの手持ちコトダマに対象のsoulがない (409 Conflict)
      /**
       * redirectToLastVisitRoomActionを使用すると，同じ部屋へリダイレクトしようとして
       * ページのリロードが発生しないため，クライアントで処理
       */
      await setFlashAction("error", "コトダマを捧げられませんでした。");
      return result;
    } else {
      // その他のエラー
      await setFlashAction("error", "予期しないエラーが発生しました。");
      redirect("/");
    }
  }

  await setFlashAction("success", "コトダマを捧げました");
  return result;
}
