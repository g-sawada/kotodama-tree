"use client";

import { useState } from "react";
import { useFlash } from "@/components/layout/FlashMessage";
import Image from "next/image";
import Button from "@/components/ui/Button";
import ResizeModal from "@/components/ui/ResizeModal";
import createPathwayAction from "@/lib/actions/pathway/createPathwayAction";
import userMoveAction from "@/lib/actions/user/userMoveAction";

interface Prop {
  thisRoomId: string;
}

export default function HomePortalButton({ thisRoomId }: Prop) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setFlash } = useFlash();

  // モーダルの開閉制御
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleClickMakePortal = async (thisRoomId: string) => {
    // ポータル作成アクションを実行, 結果をクライアントで処理
    const result = await createPathwayAction(thisRoomId);

    if(!result.isOk) {
      // エラー時
      setFlash({ type: "error", message: "ポータルの作成に失敗しました" });
      closeModal();
      return;
    }

    // 既にポータルが存在する場合(レスポンスのstatusが200 OK)
    if (result.status === 200) {
      console.log("既に存在します")
    }
    // ポータル作成成功時
    if (result.status === 201) {
      const pathway = result.body.data;
      const userHomeRoomId = pathway.room_1_id === thisRoomId ? 
                              pathway.room_2_id :  // この部屋のIDではない方がユーザーの部屋のID
                              pathway.room_1_id;
      // TODO: 作成成功のフラッシュメッセージをサーバーアクションでセットする
      await userMoveAction(userHomeRoomId);
    }
  };

  return (
    <>
      <button onClick={() => openModal()} className="text-sm">
        <Image src="/portal.svg" alt="portal_icon" width={64} height={64} />
      </button>
      <div>
        {/* 確認モーダル */}
        <ResizeModal isOpen={isModalOpen}>
          <div className="flex flex-col justify-center gap-4 mt-6">
            <p className="text-center text-lg">
              自分の部屋へのポータルを開きます。
              <br />
              よろしいですか？
            </p>
            <div className="flex justify-center my-4 gap-6">
              <Button
                text="Cancel"
                buttonType="cancel"
                handleClick={() => closeModal()}
              />
              <Button
                text="OK"
                buttonType="ok"
                // 自分の部屋に通じるポータル作成処理
                handleClick={() => handleClickMakePortal(thisRoomId)}
              />
            </div>
          </div>
        </ResizeModal>
      </div>
    </>
  );
}
