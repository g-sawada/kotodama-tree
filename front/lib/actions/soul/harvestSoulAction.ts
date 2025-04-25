"use server"

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { patchFetch } from "@/lib/api/fetcher/patchFetch";
import { setFlashAction } from "@/lib/actions/flash/setFlashAction";
import { Soul } from "@/types/soul";
import redirectToLastVisitRoomAction from "../user/redirectToLastVisitRoom";

/**
 * コトダマ収獲 API souls#harvestをコールする。ユーザーの作成実行により起動するため，サーバーアクションとして実装
 * @param soulId - コトダマのID
 * @param roomId - ユーザーの現在地の部屋ID
 * @returns SuccessResponse<Soul> | undefined
 */
export default async function harvestSoulAction(soulId: number, roomId: string) {
  // sessionからuserIdを取得。取得できない場合はloginページにリダイレクト
  const session = await auth();
  if(!session?.user?.userId) {
    await setFlashAction("error", "ユーザー情報の取得に失敗しました。\n 再ログインして下さい。")
    redirect("/login");
  }
  const userId = session.user.userId;

  // リクエストボディを作成
  const reqBody = {
    user_id: userId,
    room_id: roomId,
  };

  /**
   * コトダマ収獲 API souls#harvest を実行
   * @param soulId - 収獲するコトダマのID
   * @param user_id - ログインユーザーID
   * @param room_id - ユーザーの現在地の部屋ID
   * 
   * 正常系
   * - コトダマ収獲処理を実行 (200 OK)
   *   @returns data :Soul  収獲したコトダマ
   * 異常系
   * - 処理対象のコトダマが存在しない (404 Not Found)
   * - ユーザーのlast_visit_roomが現在訪れている部屋でない (403 Forbidden)
   * - 現在訪れている部屋のキに対象のコトダマが捧げられていない (409 Conflict)
   * - ユーザーの手持ちコトダマ数が上限値に達している (409 Conflict)
   * - その他のエラー (500 Internal Server Error)
   */
  const result = await patchFetch<Soul>(
    `/souls/${soulId}/harvest`,
    reqBody
  );

  if (!result.isOk) {
    if(result.status ===  403 || result.status === 404) {
      // ユーザーのlast_visit_roomが現在訪れている部屋でない (403 Forbidden)　
      // または処理対象のコトダマが存在しない (404 Not Found)
      await setFlashAction("error", "コトダマのしゅうかくに失敗しました。\n 最後に訪れた場所を読み込みました。");
      await redirectToLastVisitRoomAction();
      return;
    }else if (result.status === 409 || result.status === 422) {
      /**
       * redirectToLastVisitRoomActionを使用すると，同じ部屋へリダイレクトしようとして
       * ページのリロードが発生しないため，クライアントで処理
       */
      await setFlashAction("error", "コトダマのしゅうかくに失敗しました。");
      return result;
    } else {
      // その他のエラー
      await setFlashAction("error", "予期しないエラーが発生しました。");
      redirect("/");
    }
  }

  await setFlashAction("success", "コトダマを収穫しました");
  return result
}
