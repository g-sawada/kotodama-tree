import { Soul } from "@/types/soul";

import EmptyHeartButton from "@/components/ui/EmptyHeartButton";
import SoulCard from "@/components/ui/SoulCard/SoulCard";

/**
 * 手持ちコトダマ一覧を表示するコンポーネント
 * @param souls {SoulResponse[]]} コトダマの配列
 * @param setSelectedSoul {function} 親コンポーネントのuseStateで管理しているselectedSoulを更新する関数
 */

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
          {souls.map((soul) => (
            <SoulCard
              key={soul.id}
              soul={soul}
              handleCardClick={() => setSelectedSoul(soul)}
            >
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
