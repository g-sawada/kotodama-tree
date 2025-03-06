import React from "react";
import { EmblaOptionsType } from 'embla-carousel';
import Footer from "@/components/layout/Footer";
import Portal from "@/features/main/Portal/components/Portal";
import { Pathway } from "@/types/pathway";
import EmblaCarousel from "@/features/main/Portal/components/EmblaCarousel";

export default function MockPage() {
  const pathways = [{
    id: 1,
		room_1_id: "room1",
		room_2_id: "room2",
		figuretype: 1,
		color: "#ffffff",
    created_at: "",
    updated_at: ""
	},{
    id: 2,
		room_1_id: "room4",
		room_2_id: "room1",
		figuretype: 2,
		color: "#ff5555",
    created_at: "",
    updated_at: ""
	},{
    id: 3,
		room_1_id: "room3",
		room_2_id: "room1",
		figuretype: 3,
		color: "#88db4c",
    created_at: "",
    updated_at: ""
	},{
    id: 4,
		room_1_id: "room5",
		room_2_id: "room1",
		figuretype: 2,
		color: "#fcba03",
    created_at: "",
    updated_at: ""
	},{
    id: 5,
		room_1_id: "room1",
		room_2_id: "room6",
		figuretype: 1,
		color: "#fcba03",
    created_at: "",
    updated_at: ""
	},{
    id: 6,
		room_1_id: "room7",
		room_2_id: "room1",
		figuretype: 3,
		color: "#fc0341",
    created_at: "",
    updated_at: ""
	}]
  const roomUuid = "room1" // テスト用に設置
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
