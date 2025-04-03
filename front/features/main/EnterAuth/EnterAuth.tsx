'use client';

import enterAuthAction from "@/lib/actions/room/enterAuthAction";
import redirectToLastVisitRoomAction from "@/lib/actions/user/redirectToLastVisitRoom";
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
        redirectToLastVisitRoomAction(
          { errorMessage: "アクセス権限がありません" }
        );
        return;
      }
      // 入室できる場合
      setIsChecked(true);
    });
  }, [thisRoomId]);

  return (
    <>
      <div>{`thisRoomId: ${thisRoomId}`}</div>
      {/* 仮実装。今後ローディングアニメーションに置き換える */}
      {isChecked ? children : <div>入室チェック中...</div>}
    </>
  )
}
