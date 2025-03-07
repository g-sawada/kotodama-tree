import React from "react";
import Link from "next/link";
import { Pathway } from "@/types/pathway";
import { PI_Triangle, PI_Star, PI_Pentagon } from "./PortalIcons";
import "@/styles/embla.css";

type Props = {
  thisRoomUuid: string;
  pathway: Pathway;
};

const PortalIconMap: { [key: number]: React.FC } = {
  1: PI_Triangle,
  2: PI_Star,
  3: PI_Pentagon,
};

export default function Portal({ thisRoomUuid, pathway }: Props) {
  const targetRoomId = thisRoomUuid === pathway.room_1_id ? pathway.room_2_id :
                        pathway.room_1_id;
  console.log(targetRoomId); // 対象のroom_idが取得できているか確認用
  const { figuretype, color } = pathway;
  const PortalIcon = PortalIconMap[figuretype];

  return (
    // /:room_uuidを実装後、href={targetRoomId}に切り替え予定
    <Link href="/" width="64" height="64" className="inline-block embla__slide">
      {/* PortalIconMapから該当するアイコンコンポーネントを取得し、動的にレンダリングする */}
      <PortalIcon color={color} />
    </Link>
  );
}
