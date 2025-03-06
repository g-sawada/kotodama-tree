import React from "react";
import { EmblaOptionsType } from 'embla-carousel';
import PortalButtonCarousel from "@/features/main/Portal/components/PortalButtonCarousel";
import Footer from "@/components/layout/Footer";
import Portal from "@/features/main/Portal/components/Portal";
import { Pathway } from "@/types/pathway";
import { getPathwaysByRoomUuid } from "@/lib/api/pathway/getPathways";

export default async function MockPage() {
  const thisRoomUuid = "room1" // テスト用に設置
  const pathways = await getPathwaysByRoomUuid(thisRoomUuid)
  const emblaOptions: EmblaOptionsType = { dragFree: true } //カルーセルに渡すオプション
  return (
    <>
      <div className="flex-auto">
        <h1 className="text-lg">ここはモックページ</h1>
        <div className="flex w-full justify-center items-center h-60 gap-4">
          キの画像
        </div>
        <PortalButtonCarousel options={emblaOptions}>
          {pathways.map((pathway: Pathway) => (
            <Portal key={pathway.id} thisRoomUuid={thisRoomUuid} pathway={pathway} />
          ))}
        </PortalButtonCarousel>
      </div>
      <Footer />
    </>
  );
}
