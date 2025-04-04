"use client"

import EmptyHeartButton from "@/components/ui/EmptyHeartButton";
import SoulCard from "@/components/ui/SoulCard/SoulCard";
import offerSoulAction from "@/lib/actions/soul/offerSoulAction";
import { Soul } from "@/types/soul";

type Props = {
  souls: Soul[];
  roomId: string;
};

export default function OfferSoulCardList({ souls, roomId }: Props) {

  const handleClick = (soul: number, roomId: string) =>  {
    offerSoulAction(soul, roomId);
  }

  return (
    <>
      <div className="mx-auto w-full my-4">
        <div className="flex flex-col gap-6 items-center">
          {souls.length > 0 ?
            souls.map((soul: Soul) => (
              <SoulCard
                key={soul.id}
                soul={soul}
                handleCardClick={() => handleClick(soul.id, roomId)}
              >
                <div className="flex justify-between">
                  <p className="text-gray-700 text-md">by {soul.creator.name}</p>
                  <EmptyHeartButton />
                </div>
              </SoulCard>
            )) :
            <p className="text-gray-700 text-md">コトダマがありません</p>
          }
        </div>
      </div>
    </>
  );
}
