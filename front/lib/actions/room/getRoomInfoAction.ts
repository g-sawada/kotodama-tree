"use server"

import { setFlashAction } from "@/lib/actions/flash/setFlashAction";
import { getRoomInfo } from "@/lib/api/room/getRoomInfo";
import redirectToLastVisitRoomAction from "../user/redirectToLastVisitRoom";

import { RoomInfo } from "@/types/room";

/**
 * 部屋情報取得アクション
 * fetch関数 getRoomInfo.tsをコールして，コトダマ一覧を取得する
 * @param room_id 部屋ID
 * @returns RoomInfo
 */

export default async function getRoomInfoAction(room_id: string): Promise<RoomInfo | undefined> {
  const result = await getRoomInfo(room_id);
  if (!result.isOk) {
    await setFlashAction("error", "データを取得できませんでした。 \n 最後に訪れた場所を読み込みました。");
    await redirectToLastVisitRoomAction();
    return;
  }

  return result.body.data;
} 