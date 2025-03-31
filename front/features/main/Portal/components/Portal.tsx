import React from "react";
import Link from "next/link";
import { Pathway } from "@/types/pathway";
import { PI_Triangle, PI_Star, PI_Pentagon } from "./PortalIcons";
import "@/styles/embla.css";

type Props = {
  thisRoomId: string;
  pathway: Pathway;
};

const PortalIconMap: { [key: number]: React.FC } = {
  1: PI_Triangle,
  2: PI_Star,
  3: PI_Pentagon,
};

export default function Portal({ thisRoomId, pathway }: Props) {
  const targetRoomId = thisRoomId === pathway.room_1_id ?
                        pathway.room_2_id : pathway.room_1_id;
  const { figure_type, color } = pathway;
  const PortalIcon = PortalIconMap[figure_type];

  return (
    // /:room_uuidを実装後、href={targetRoomId}に切り替え予定
    <Link href="/" width="64" height="64" className="inline-block embla__slide">
      {/* PortalIconMapから該当するアイコンコンポーネントを取得し、動的にレンダリングする */}
      <PortalIcon color={color} />
    </Link>
  );
}
