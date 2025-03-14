// import * as React from 'react' paramsの取得に必要？
import EmptyHeartButton from "@/components/ui/EmptyHeartButton";
import SoulCard from "@/components/ui/SoulCard/SoulCard";
import { Soul } from "@/types/soul";

type Props = {
  souls: Soul[];
  setSelectedSoul: (soul: Soul) => void;
};

export default function CarryingSoulCardList({
  souls,
  setSelectedSoul,
}: Props) {
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
              <div className="flex justify-between">
                <p className="text-gray-700 text-md">by 名無しさん</p>
                <EmptyHeartButton />
              </div>
            </SoulCard>
          ))}
        </div>
      </div>
    </>
  );
}
