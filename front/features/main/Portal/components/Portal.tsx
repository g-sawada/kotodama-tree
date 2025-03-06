import React from "react";
import Link from "next/link";
import { Pathway } from "@/types/pathway";
import { Type1, Type2, Type3 } from "./PortalIcons";
import "@/styles/embla.css";

type Props = {
  roomUuid: string;
  pathway: Pathway;
};

const componentMap: { [key: number]: React.FC } = {
  1: Type1,
  2: Type2,
  3: Type3,
};

export default function Portal({ roomUuid, pathway }: Props) {
  const hRef =
    roomUuid === pathway.room_1_id ? pathway.room_2_id : pathway.room_1_id;
  console.log(hRef) // 対象のroom_idが取得できているか確認用
  const figureType = pathway.figuretype;
  const color = pathway.color;
  const Component = componentMap[figureType];

  return (
    // /:room_uuidを実装後、href={hRef}に切り替え予定
    <Link href="/" width="64" height="64" className="inline-block embla__slide">
      {/* componentMapから該当するアイコンコンポーネントを取得し、動的にレンダリングする */}
      <Component color={color} />
    </Link>
  );
}
