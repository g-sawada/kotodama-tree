"use client";
import { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import FullSizeModal from "@/components/ui/FullSizeModal";
import { Soul } from "@/types/soul";
import { getSoulsByOwnerIdAction } from "@/lib/actions/getSouls";
import SoulDetailCard from "./SoulDetailCard";
import SoulCardList from "./SoulCardList";
import { useRouter } from 'next/navigation'

/**
 * 手持ちのコトダマ一覧用のモーダルコントローラー
 * 
 * @param isRoomOwner ログイン中ユーザー本人の部屋にいる時のみtrue。デフォルトはfalse
 * 
 * 
 */

type Props = {
  isRoomOwner?: boolean;
};

export default function HoldingSoulsModalController({ isRoomOwner=false }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [souls, setSouls] = useState<Soul[]>([]);
  const [selectedSoul, setSelectedSoul] = useState<Soul | null>(null);
  const router = useRouter();

  // モーダルの開閉制御
  const openModal = async () => {
    setIsModalOpen(true);
    const user_uuid = "abc";
    // コトダマ一覧データを取得し，stateにセット
    try {
      const souls: Soul[] = await getSoulsByOwnerIdAction(user_uuid);
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
        text="Open Modal"
        onClick={handleClickModalButton}
        className="flex flex-col items-center flex-1 py-4"
      >
        <Image
          src="icon_images/footer_kotodama.svg"
          alt="Icon 1"
          width={20}
          height={20}
          className="mb-1"
        />
        <span className="text-[0.5rem] btm-nav-label">手持ちのコトダマ</span>
      </button>

      <div>
        <FullSizeModal isOpen={isModalOpen}>
          <h1 className="text-center text-xl font-bold">
            {selectedSoul ? "コトダマ詳細" : "手持ちのコトダマ一覧"}
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
                      handleClick={() => router.push('#')}
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
