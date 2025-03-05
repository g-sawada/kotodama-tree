import React from "react";
import Footer from "@/components/layout/Footer";
import Portal from "@/features/main/Portal/components/Portal";

export default function MockPage() {
  const pathway = {
    id: 1,
		room_1_id: "room1",
		room_2_id: "room2",
		figuretype: 3,
		color: "#ffffff",
    created_at: "",
    updated_at: ""
	}
  const roomUuid = "room1"
  return (
    <>
      <div className="flex-auto">
        <h1 className="text-lg">ここはモックページ</h1>
        <div className="flex w-full justify-center items-center h-60 gap-4">
          キの画像
        </div>
        <Portal roomUuid={roomUuid} pathway={pathway}/>
      </div>
      <Footer />
    </>
  );
}
