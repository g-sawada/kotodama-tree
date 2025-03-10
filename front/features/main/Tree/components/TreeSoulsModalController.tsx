"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import FullSizeModal from "@/components/ui/FullSizeModal";
import { Soul } from "@/types/soul";
import SoulDetailCard from "@/components/ui/SoulCard/SoulDetailCard";
import SoulCardList from "@/components/ui/SoulCard/SoulCardList";
import Tree from "@/components/ui/Tree";
import { getSoulsByCapturedTreeIdAction } from "@/lib/actions/getSouls";

/**
 * キのコトダマ一覧用のモーダルコントローラー
 *
 * @param isRoomOwner ログイン中ユーザー本人の部屋にいる時のみtrue。デフォルトはfalse
 *
 *
 */

type Props = {
  isRoomOwner?: boolean;
};

export default function TreeSoulsModalController({
  isRoomOwner = false,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [souls, setSouls] = useState<Soul[]>([]);
  const [selectedSoul, setSelectedSoul] = useState<Soul | null>(null);
  const router = useRouter();

  // モーダルの開閉制御
  const openModal = async () => {
    setIsModalOpen(true);
    const captured_tree_id = "ABC";
    // コトダマ一覧データを取得し，stateにセット
    try {
      const souls: Soul[] = await getSoulsByCapturedTreeIdAction(captured_tree_id);
      setSouls(souls);
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSoul(null); // 選択中のコトダマをリセット
  };

  // Modalボタンをクリックした時の処理
  const handleClickModalButton = () => {
    openModal();
  };

  // 閉じるボタンをクリックした時の処理
  const handleClickCloseButton = () => {
    closeModal();
  };

  return (
    <>
      <button
        onClick={handleClickModalButton}
        className="flex flex-col items-center flex-1 py-4"
      >
        <Tree />
        
      </button>

      <div>
        <FullSizeModal isOpen={isModalOpen}>
          <h1 className="text-center text-xl font-bold">
            {selectedSoul ? "コトダマ詳細" : "コトダマ一覧"}
          </h1>
          <div className="my-4">
            {/* 選択中のコトダマがあれば詳細，なければ一覧 */}
            {selectedSoul ? (
              <SoulDetailCard
                soul={selectedSoul}
                setSelectedSoul={setSelectedSoul}
              />
            ) : (
              <>
                <SoulCardList souls={souls} setSelectedSoul={setSelectedSoul} />
                {/* ユーザー自身の部屋の時のみ捧げページへのリンクを表示 */}
                {isRoomOwner && (
                  <div className="flex justify-center my-4">
                    <Button
                      text="コトダマを捧げる"
                      handleClick={() => router.push("#")}
                      buttonType="cancel"
                    />
                  </div>
                )}
              </>
            )}
          </div>
          <div className="flex justify-center my-4">
            <Button
              text="閉じる"
              handleClick={handleClickCloseButton}
              buttonType="cancel"
            />
          </div>
        </FullSizeModal>
      </div>
    </>
  );
}
