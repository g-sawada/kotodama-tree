"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import SoulCard from "@/components/ui/SoulCard/SoulCard";
import { Soul } from "@/types/soul";
import { calculateSoulExp } from "@/lib/logic/calculateSoulExp";
import HeartButtonToggle from "../../Favorite/components/HeartButtonToggle";
import ResizeModal from "@/components/ui/ResizeModal";
import harvestSoulAction from "@/lib/actions/soul/harvestSoulAction";
import Button from "@/components/ui/Button";

type Props = {
  souls: Soul[];
  isRoomOwner: boolean;
  canHarvest: boolean;
};

export default function TreeSoulCardList({
  souls,
  isRoomOwner,
  canHarvest,
}: Props) {
  const roomId = useParams().roomId as string; // URLパラメータからroomIdを取得
  const [selectedSoul, setSelectedSoul] = useState<Soul | null>(null);

  const openConfirmModal = (soul: Soul) => {
    setSelectedSoul(soul);
  };

  const closeConfirmModal = () => {
    setSelectedSoul(null);
  };

  if (isRoomOwner) {
    // ユーザーのホームの部屋の場合，経験値を算出して表示する
    souls.forEach((soul) => {
      soul.exp = calculateSoulExp(soul);
    });
  }
  const handleHarvestSubmit = async (soulId: number, roomId: string) => {
    const result = await harvestSoulAction(soulId, roomId);
    if (result?.isOk) {
      // 成功時はクライアント側で再読み込みを実行
      window.location.reload();
    } else {
      // 仮実装。
      // 0410現在，harvestSoulAction内でリダイレクト処理を行っているが，クライアント側にエラーを出力するようにしたい
      console.log("エラーです。");
    }
  };

  return (
    <>
      <div className="mx-auto w-full">
        <div className="flex flex-col gap-6 items-center">
          {souls.map((soul: Soul) => (
            <SoulCard
              key={soul.id}
              soul={soul}
              {...(!isRoomOwner && canHarvest
                ? { handleCardClick: () => openConfirmModal(soul) }
                : {})}
            >
              {/* ユーザーのホームのキの場合のみ，expを表示 */}
              {isRoomOwner && (
                <p className="w-24 text-gray-700 bg-white rounded-xl px-2 text-center my-2 shadow-[0px_0px_5px_2px_#fff]">
                  exp: {soul.exp}
                </p>
              )}

              <div className="flex justify-between">
                <p className="text-gray-700 text-md">by {soul.creator.name}</p>
                <HeartButtonToggle soul={soul} />
              </div>
            </SoulCard>
          ))}
          {/* 確認モーダル */}
          <ResizeModal isOpen={!!selectedSoul}>
            {selectedSoul && (
              <>
                <div className="my-4">
                  <SoulCard soul={selectedSoul}>
                    <p className="text-gray-700 text-md">
                      by {selectedSoul.creator.name}
                    </p>
                  </SoulCard>
                </div>
                <p className="my-2 flex justify-center">
                  このコトダマをしゅうかくしますか？
                </p>
                <div className="flex flex-justify-between gap-8 justify-center my-4">
                  <Button
                    text="キャンセル"
                    handleClick={() => closeConfirmModal()}
                    buttonType="cancel"
                  />
                  <Button
                    text="OK"
                    buttonType="ok"
                    handleClick={() =>
                      handleHarvestSubmit(selectedSoul.id, roomId)
                    }
                  />
                </div>
              </>
            )}
          </ResizeModal>
        </div>
      </div>
    </>
  );
}
