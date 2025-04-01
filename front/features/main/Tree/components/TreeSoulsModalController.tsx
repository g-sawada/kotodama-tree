"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Soul } from "@/types/soul";
import getSoulsAction from "@/lib/actions/soul/getSoulsAction";

import Button from "@/components/ui/Button";
import FullSizeModal from "@/components/ui/FullSizeModal";
import SoulDetailCard from "@/components/ui/SoulCard/SoulDetailCard";
import Tree from "@/components/ui/Tree";
import EmptyHeartButton from "@/components/ui/EmptyHeartButton";

import TreeSoulCardList from "@/features/main/Tree/components/TreeSoulCardList";

/**
 * キのコトダマ一覧用のモーダルコントローラー
 * @param isRoomOwner ログイン中ユーザー本人の部屋にいる時のみtrue。デフォルトはfalse
 * @param treeId 滞在中のroomに紐づくtree_idを受け取る
 */

type Props = {
  isRoomOwner?: boolean;
  treeId: number;
};

export default function TreeSoulsModalController({
  isRoomOwner = false,
  treeId,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [souls, setSouls] = useState<Soul[]>([]);
  const [selectedSoul, setSelectedSoul] = useState<Soul | null>(null);
  const router = useRouter();

  // モーダルの開閉制御
  const openModal = async () => {
    setIsModalOpen(true);
    // モーダルを開いたときにキのコトダマ一覧を取得
    const souls: Soul[] = await getSoulsAction({ captured_tree_id: treeId });
    setSouls(souls);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSoul(null); // 選択中のコトダマをリセット
  };

  const backToList = () => {
    setSelectedSoul(null); // 選択中のコトダマをリセット
  };

  return (
    <>
      <button
        onClick={() => openModal()}
        className="flex flex-col items-center flex-1 py-4 my-4 md:my-0"
      >
        <Tree />
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
                    <EmptyHeartButton />
                  </div>
                </SoulDetailCard>
                {!isRoomOwner && (
                  <div className="flex justify-center my-4">
                    <Button
                      text="しゅうかくする"
                      handleClick={() => router.push("#")}
                      buttonType="ok"
                    />
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
                      handleClick={() => router.push("/mock/offer")}
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
      </div>
    </>
  );
}
