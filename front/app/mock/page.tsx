import React from "react";
import { EmblaOptionsType } from 'embla-carousel';
import EmblaCarousel from "@/features/main/Portal/components/EmblaCarousel";
import Footer from "@/components/layout/Footer";
import Portal from "@/features/main/Portal/components/Portal";
import { Pathway } from "@/types/pathway";
import { getPathwaysByRoomUuid } from "@/lib/api/pathway/getPathways";

export default async function MockPage() {
  const roomUuid = "room1" // テスト用に設置
  const pathways = await getPathwaysByRoomUuid(roomUuid)
  const OPTIONS: EmblaOptionsType = { dragFree: true } //カルーセルに渡すオプション
  return (
    <>
      <div className="flex-auto">
        <h1 className="text-lg">ここはモックページ</h1>
        <div className="flex w-full justify-center items-center h-60 gap-4">
          キの画像
        </div>
        <EmblaCarousel options={OPTIONS}>
          {pathways.map((pathway: Pathway) => (
            <Portal key={pathway.id} roomUuid={roomUuid} pathway={pathway} />
          ))}
        </EmblaCarousel>
      </div>
      <Footer />
    </>
  );
}
