// import * as React from 'react' paramsの取得に必要？
import EmptyHeartButton from "@/components/ui/EmptyHeartButton";
import SoulCard from "@/components/ui/SoulCard/SoulCard";
import { Soul } from "@/types/soul";
import { calculateSoulExp } from "@/lib/logic/calculateSoulExp";

type Props = {
  souls: Soul[];
  setSelectedSoul: (soul: Soul) => void;
  isRoomOwner: boolean;
};

export default function TreeSoulCardList({ souls, setSelectedSoul, isRoomOwner }: Props) {

  if(isRoomOwner) {
    // ユーザーのホームの部屋の場合，経験値を算出して表示する
    souls.forEach((soul) =>  {
      soul.exp = calculateSoulExp(soul);
    })
  }

  return (
    <>
      <div className="mx-auto w-full">
        <div className="flex flex-col gap-6 items-center">
          {souls.map((soul: Soul) => (
            <SoulCard
              key={soul.id}
              soul={soul}
              handleCardClick={() => setSelectedSoul(soul)}
            >
              {/* ユーザーのホームのキの場合のみ，expを表示 */}
              {isRoomOwner && (
                <p className="w-24 text-gray-700 bg-white rounded-xl px-2 text-center my-2 shadow-[0px_0px_5px_2px_#fff]">
                  exp: {soul.exp}
                </p>
              )}
              
              <div className="flex justify-between">
                <p className="text-gray-700 text-md">by {soul.creator.name}</p>
                <EmptyHeartButton />
              </div>
            </SoulCard>
          ))}
        </div>
      </div>
    </>
  );
}
