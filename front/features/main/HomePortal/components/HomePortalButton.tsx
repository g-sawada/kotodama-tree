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
  const { setFlash } = useFlash();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  const [userHomeRoomIdState, setUserHomeRoomIdState] = useState<string | null>(null);

  // モーダルの開閉制御
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openMoveModal = () => {
    setIsMoveModalOpen(true);
  };
  const closeMoveModal = () => {
    setIsMoveModalOpen(false);
  }

  //ポータル作成ボタンが押されたときの処理
  const handleClickMakePortal = async (thisRoomId: string) => {
    // ポータル作成アクションを実行, 結果をクライアントで処理
    const result = await createPathwayAction(thisRoomId);
    if(!result || !result.isOk) {
      // エラー時
      setFlash({ type: "error", message: "ポータルの作成に失敗しました" });
      closeModal();
      return;
    }
    const pathway = result.body.data;
    const userHomeRoomId = pathway.room_1_id === thisRoomId ? 
                            pathway.room_2_id :  // この部屋のIDではない方がユーザーの部屋のID
                            pathway.room_1_id;

    // 既にポータルが存在する場合(レスポンスのstatusが200 OK)
    if (result.status === 200) {
      // 後続の処理に必要なユーザーの部屋のIDをstateにセット
      setUserHomeRoomIdState(userHomeRoomId);
      closeModal();    // ポータル作成モーダルを閉じる
      openMoveModal(); // ホームへの移動モーダルを開く
      return;
    }

    // ポータル作成成功時(statusが201 Created)
    if (result.status === 201) {
      // TODO: 作成成功のフラッシュメッセージをサーバーアクションでセットする
      await userMoveAction(userHomeRoomId);
    }
  };

  // ホームへの移動ボタンが押されたときの処理
  const handleClickMoveHome = async () => {
    if(userHomeRoomIdState !== null) {
      await userMoveAction(userHomeRoomIdState);
    }
    closeMoveModal();
  }

  return (
    <>
      <button onClick={() => openModal()} className="text-sm">
        <Image src="/portal.png" alt="portal_icon" width={64} height={64} />
      </button>
      <div>
        {/* 確認モーダル */}
        <ResizeModal isOpen={isModalOpen}>
          <div className="flex flex-col justify-center gap-4 mt-6">
            <p className="text-center text-lg">
              自分のキへのポータルを開きます。
              <br />
              よろしいですか？
            </p>
            <div>
              <p className="text-sm text-yellow-300">
                ポータルは他のユーザーも使用できます。
              </p>
              <p className="text-sm text-yellow-300">
                一度開いたポータルは、閉じることができません。
              </p>
            </div>
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

        {/* 作成済みの場合のホーム移動実行モーダル */}
        <ResizeModal isOpen={isMoveModalOpen}>
          <div className="flex flex-col justify-center gap-4 mt-6">
            <p className="text-center text-lg">
              ホームへのポータルが既に存在します。
              <br />
              ホームに移動しますか？
            </p>
            <div className="flex justify-center my-4 gap-6">
              <Button
                text="Cancel"
                buttonType="cancel"
                handleClick={() => {
                  setUserHomeRoomIdState(null);
                  closeMoveModal();
                } }
              />
              <Button
                text="OK"
                buttonType="ok"
                // 自分の部屋への移動処理
                handleClick={() => handleClickMoveHome()}
              />
            </div>
          </div>
        </ResizeModal>
      </div>
    </>
  );
}
