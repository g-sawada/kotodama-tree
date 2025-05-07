"use client"

import SoulCard from "@/components/ui/SoulCard/SoulCard";
import offerSoulAction from "@/lib/actions/soul/offerSoulAction";
import { Soul } from "@/types/soul";

type Props = {
  souls: Soul[];
  roomId: string;
};

export default function OfferSoulCardList({ souls, roomId }: Props) {

  const handleClick = async (soul: number, roomId: string) =>  {
    const result = await offerSoulAction(soul, roomId);
    if(result?.isOk) {
      // 0425 成功時・失敗時ともにクライアント側で再読み込みを実行する暫定対応
      window.location.reload();
    }else{
      window.location.reload();
    }
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
                </div>
              </SoulCard>
            )) :
            <p className="text-gray-500 text-md">コトダマがありません</p>
          }
        </div>
      </div>
    </>
  );
}
