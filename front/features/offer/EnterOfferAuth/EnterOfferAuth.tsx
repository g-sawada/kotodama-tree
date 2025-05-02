'use client';

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

import getRoomInfoAction from "@/lib/actions/room/getRoomInfoAction";
import { setFlashAction } from "@/lib/actions/flash/setFlashAction";

import { RoomInfo } from "@/types/room";

/**
 * 捧げ画面（/m/[roomId]/offer）の入室認証コンポーネント。Offerのpage.tsxをラップする
 * 捧げ画面にはキの持ち主のユーザーのみが入室できるため，room情報取得APIをコールし，
 * room.user_idとセッションのuser_idが一致するかを判定する * 
 * 入室不可の場合，ユーザーのlast_visit_roomにリダイレクトする
 * @prop { thisRoomId: string } - URLパラメータroomId
 * @prop { children: React.ReactNode } - page.tsxのchildren
 */

interface EnterAuthProps {
  thisRoomId: string;
  userId: string | undefined;
  children: React.ReactNode;
}

export default function EnterOfferAuth({ thisRoomId, userId, children }: EnterAuthProps) {
  // 入室チェックの完了まではローディングを表示する
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    getRoomInfoAction(thisRoomId).then((data: RoomInfo | undefined) => {
      if(!data) return;
      const { room } = data;
      // room情報のuser_idとsessionのuserIdが一致するか確認
      if(room.user_id !== userId) {
        // 一致しない場合は，入室不可のためリダイレクト
        setFlashAction(
          "error",
          "アクセスできません。 \n 最後に訪れた部屋を読み込みました。"
        ).then(() => {
          redirect(`/m/${thisRoomId}`);
          // NOTE: setFlashActionが非同期処理のため，thenを使ってPromiseを待つようにする
        });
      } else {
        // 一致する場合はローディングを解除し，childrenを表示する
        setIsChecked(true);
      }
    });
  });

  return (
    <>
      {/* 仮実装。今後ローディングアニメーションに置き換える */}
      {isChecked ? children : <div>入室チェック中...</div>}
    </>
  )
}
