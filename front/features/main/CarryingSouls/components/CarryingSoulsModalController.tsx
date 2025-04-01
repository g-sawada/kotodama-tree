"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import getSoulsAction from "@/lib/actions/soul/getSoulsAction";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { Soul } from "@/types/soul";

import Button from "@/components/ui/Button";
import FullSizeModal from "@/components/ui/FullSizeModal";
import SoulDetailCard from "@/components/ui/SoulCard/SoulDetailCard";
import EmptyHeartButton from "@/components/ui/EmptyHeartButton";

import CarryingSoulCardList from "../CarryingSoulCardList";

/**
 * 手持ちのコトダマ一覧用のモーダルコントローラー
 * @param isRoomOwner ログイン中ユーザー本人の部屋にいる時のみtrue。デフォルトはfalse
 */

type Props = {
  isRoomOwner?: boolean;
};

export default function CarryingSoulsModalController({
  isRoomOwner = false,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [souls, setSouls] = useState<Soul[]>([]);
  const [selectedSoul, setSelectedSoul] = useState<Soul | null>(null);
  const router = useRouter();
  // session情報を取得
  const session = useSession();
  if(!session.data?.user.userId) {
    router.push("/login");
  }
  const userId = session.data?.user.userId;

  // モーダルの開閉制御
  const openModal = async () => {
    setIsModalOpen(true);
    // モーダルを開いた時にユーザーが所持中のコトダマ一覧データを取得
    const souls: Soul[] = await getSoulsAction({ owner_id: userId });
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
        className="flex flex-col items-center flex-1 py-4"
      >
        <Image
          src="/icon_images/footer_kotodama.svg"
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
              <>
                <SoulDetailCard soul={selectedSoul}>
                  <div className="flex justify-between">
                    <p className="text-gray-700 text-md">by 名無しさん</p>
                    <EmptyHeartButton />
                  </div>
                </SoulDetailCard>
                <div className="flex justify-center my-4">
                  <Button
                    text="一覧にもどる"
                    handleClick={backToList}
                    buttonType="cancel"
                  />
                </div>
              </>
            ) : (
              <>
                <CarryingSoulCardList
                  souls={souls}
                  setSelectedSoul={setSelectedSoul}
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
