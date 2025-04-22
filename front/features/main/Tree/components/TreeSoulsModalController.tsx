"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Soul } from "@/types/soul";
import { User } from "@/types/user";
import getSoulsAction from "@/lib/actions/soul/getSoulsAction";

import Button from "@/components/ui/Button";
import FullSizeModal from "@/components/ui/FullSizeModal";
import SoulDetailCard from "@/components/ui/SoulCard/SoulDetailCard";
import TreeImg from "@/components/ui/TreeImg";
import TreeSoulCardList from "@/features/main/Tree/components/TreeSoulCardList";
import ResizeModal from "@/components/ui/ResizeModal";
import SoulCard from "@/components/ui/SoulCard/SoulCard";
import harvestSoulAction from "@/lib/actions/soul/harvestSoulAction";
import { Tree } from "@/types/tree";


/**
 * キのコトダマ一覧用のモーダルコントローラー
 * @param isRoomOwner ログイン中ユーザー本人の部屋にいる時のみtrue。デフォルトはfalse
 * @param treeId 滞在中のroomに紐づくtree_idを受け取る
 */

type Props = {
  isRoomOwner?: boolean;
  tree: Tree;
  user: User;
};

export default function TreeSoulsModalController({
  isRoomOwner = false,
  tree,
  user
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [souls, setSouls] = useState<Soul[]>([]);
  const [selectedSoul, setSelectedSoul] = useState<Soul | null>(null);
  const router = useRouter();
  const roomId = useParams().roomId as string;  // URLパラメータからroomIdを取得

  // ユーザーのコトダマ収穫可否
  const canHarvest = user.carrying_souls_count < user.max_carry_souls
  

  // モーダルの開閉制御
  const openModal = async () => {
    setIsModalOpen(true);
    // モーダルを開いたときにキのコトダマ一覧を取得
    const souls: Soul[] = await getSoulsAction({ captured_tree_id: tree.id });
    setSouls(souls);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSoul(null); // 選択中のコトダマをリセット
  };

  const openConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  const closeComfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const backToList = () => {
    setSelectedSoul(null); // 選択中のコトダマをリセット
  };

  const handleHarvestSubmit = async (soulId: number, roomId: string) => {
    const result = await harvestSoulAction(soulId, roomId)
    if(result?.isOk) {
      // 成功時はクライアント側で再読み込みを実行
      window.location.reload();
    }else{
      // 仮実装。
      // 0410現在，harvestSoulAction内でリダイレクト処理を行っているが，クライアント側にエラーを出力するようにしたい
      console.log("エラーです。")
    }
  }


  return (
    <>
      <button
        onClick={() => openModal()}
        className="flex flex-col items-center flex-1 my-4 md:my-0"
      >
        <TreeImg />
      </button>

      <div>
        <FullSizeModal isOpen={isModalOpen}>
          <h1 className="text-center text-xl font-bold">
            {selectedSoul ? "コトダマ詳細" : "コトダマ一覧"}
          </h1>
          <div className="my-4">

            {selectedSoul ? (
              // 選択中のコトダマがあれば詳細画面を表示
              <>
                <SoulDetailCard soul={selectedSoul}>
                  {isRoomOwner && (
                    <p className="w-24 text-gray-700 bg-white rounded-xl px-2 text-center my-2 shadow-[0px_0px_5px_2px_#fff]">
                      exp: {selectedSoul.exp}
                    </p>
                  )}
                  <div className="flex justify-between">
                    <p className="text-gray-700 text-md">by {selectedSoul.creator.name}</p>
                  </div>
                </SoulDetailCard>
                {!isRoomOwner && (
                  <div className="my-6">
                    {!canHarvest && (
                      <p className="flex justify-center text-sm text-gray-500">
                        しゅうかく数上限に達しています
                      </p>
                    )}
                    <div className="flex justify-center my-4 max-w-40 mx-auto">
                      <Button
                        text="しゅうかくする"
                        handleClick={() => openConfirmModal()}
                        isDisabled={!canHarvest}
                        buttonType="ok"
                      />
                    </div>
                  </div>
                )}
                <div className="flex justify-center my-4">
                  <Button
                    text="一覧にもどる"
                    handleClick={backToList}
                    buttonType="cancel"
                  />
                </div>
              </>
            ) : (
            // 選択中のコトダマがなければ一覧を表示
              <>
                <TreeSoulCardList
                  souls={souls}
                  setSelectedSoul={setSelectedSoul}
                  isRoomOwner={isRoomOwner}
                />
                {/* ユーザー自身の部屋の時のみ捧げページへのリンクを表示 */}
                {isRoomOwner && (
                  <div className="flex justify-center my-4">
                    <Button
                      text="コトダマを捧げる"
                      handleClick={() => router.push(`/m/${roomId}/offer`)}
                      buttonType="ok"
                    />
                  </div>
                )}
              </>
            )}
          </div>
          <div className="flex justify-center my-4">
            <Button
              text="閉じる"
              handleClick={() => closeModal()}
              buttonType="cancel"
            />
          </div>
        </FullSizeModal>
        
        {/* 確認モーダル */}
        <ResizeModal isOpen={isConfirmModalOpen}>
          {!!selectedSoul &&
            <>
              <div className="my-4">
                  <SoulCard soul={selectedSoul}>
                    <p className="text-gray-700 text-md">by {selectedSoul.creator.name}</p>
                  </SoulCard>
              </div>
              <p className="my-2 flex justify-center">このコトダマをしゅうかくしますか？</p>
              <div className="flex flex-justify-between gap-8 justify-center my-4">
                <Button
                  text="キャンセル"
                  handleClick={() => closeComfirmModal()}
                  buttonType="cancel"
                  />
                <Button
                  text="OK"
                  buttonType="ok"
                  handleClick={() => handleHarvestSubmit(selectedSoul?.id, roomId)}
                />
              </div>
            </>
          }
        </ResizeModal>
      </div>
    </>
  );
}
