'use client';

import enterAuthAction from "@/lib/actions/room/enterAuthAction";
import redirectToLastVisitRoomAction from "@/lib/actions/user/redirectToLastVisitRoom";
import { setFlashAction } from "@/lib/actions/flash/setFlashAction";
import { useEffect, useState } from "react";

/**
 * メイン画面（/m/[roomId]）の入室認証コンポーネント。page.tsxをラップする
 * URLパラメータroomIdとsessionのuserからAPI rooms#enterをコールする
 * 入室不可の場合，ユーザーのlast_visit_roomにリダイレクトする
 * @prop { thisRoomId: string } - URLパラメータroomId
 * @prop { children: React.ReactNode } - page.tsxのchildren
 */

interface EnterAuthProps {
  thisRoomId: string;
  children: React.ReactNode;
}

export default function EnterAuth({ thisRoomId, children }: EnterAuthProps) {
  // 入室チェックの完了まではローディングを表示する
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    enterAuthAction(thisRoomId).then((canEnter) => {
      if(!canEnter) {
        // 入室できない場合
        setFlashAction(
          "error",
          "アクセスできません。 \n 最後に訪れた場所を読み込みました。"
        ).then(() =>  {
          redirectToLastVisitRoomAction();
          return;
        })
      }
      // 入室できる場合は，ローディングを解除してchildrenを表示する
      setIsChecked(true);
    });
  // thisRoomIdを監視し，変更の度に入室チェックを行う
  }, [thisRoomId]);

  return (
    <>
      <div>{`thisRoomId: ${thisRoomId}`}</div>
      {/* 仮実装。今後ローディングアニメーションに置き換える */}
      {isChecked ? children : <div>入室チェック中...</div>}
    </>
  )
}
