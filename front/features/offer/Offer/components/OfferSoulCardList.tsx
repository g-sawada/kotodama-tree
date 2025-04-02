"use client"
import EmptyHeartButton from "@/components/ui/EmptyHeartButton";
import SoulCard from "@/components/ui/SoulCard/SoulCard";
import { offerSoulAction } from "@/lib/actions/offerSoulAction";
import { Soul } from "@/types/soul";

type Props = {
  souls: Soul[];
  treeId: string;
};

export default function OfferSoulCardList({ souls, treeId }: Props) {

  return (
    <>
      <div className="mx-auto w-full my-4">
        <div className="flex flex-col gap-6 items-center">
          {souls.map((soul: Soul) => (
            <SoulCard
              key={soul.id}
              soul={soul}
              handleCardClick={() => offerSoulAction(soul.id, treeId)}
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
