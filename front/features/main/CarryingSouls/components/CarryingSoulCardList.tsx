import { Soul } from "@/types/soul";
import SoulCard from "@/components/ui/SoulCard/SoulCard";
import HeartButtonToggle from "../../Favorite/components/HeartButtonToggle";

/**
 * 手持ちコトダマ一覧を表示するコンポーネント
 * @param souls {SoulResponse[]]} コトダマの配列
 */

type Props = {
  souls: Soul[];
};

export default function CarryingSoulCardList({
  souls
}: Props) {
  return (
    <>
      <div className="mx-auto w-full">
        <div className="flex flex-col gap-6 items-center">
          {souls.map((soul) => (
            <SoulCard
              key={soul.id}
              soul={soul}
            >
              <div className="flex justify-between">
                <p className="text-gray-700 text-md">by {soul.creator.name}</p>
                <HeartButtonToggle soul={soul} />
              </div>
            </SoulCard>
          ))}
        </div>
      </div>
    </>
  );
}
