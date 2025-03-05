import React from "react";
import Footer from "@/components/layout/Footer";
import Portal from "@/features/main/Portal/components/Portal";
import { Pathway } from "@/types/pathway";

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
	}]
  const roomUuid = "room1" // テスト用に設置
  return (
    <>
      <div className="flex-auto">
        <h1 className="text-lg">ここはモックページ</h1>
        <div className="flex w-full justify-center items-center h-60 gap-4">
          キの画像
        </div>
        <div className="w-3/5 mx-auto">
          {pathways.map((pathway: Pathway) => (
            <Portal key={pathway.id} roomUuid={roomUuid} pathway={pathway} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
