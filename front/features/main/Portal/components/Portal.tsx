import React from "react";
import Link from "next/link";
// import dynamic from "next/dynamic";
import { Pathway } from "@/types/pathway";
import { Type1, Type2, Type3 } from "./PortalIcons";

type Props = {
  roomUuid: string;
  pathway: Pathway;
}

const componentMap: { [key: number]: React.FC } = {
  1: Type1,
  2: Type2,
  3: Type3,
};

export default function Portal({ roomUuid, pathway }: Props) {
  const hRef = (roomUuid === pathway.room_1_id ? pathway.room_2_id : pathway.room_1_id)
  const figureType = pathway.figuretype;
  const color = pathway.color;
  const Component = componentMap[figureType]

  return (
    <Link href="/" width="30" height="30" className="inline-block">
    <Component color={color} />
  </Link>
);
}
