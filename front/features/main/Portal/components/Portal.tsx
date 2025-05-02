'use client'

import { Pathway } from "@/types/pathway";
import "@/styles/embla.css";

import userMoveAction from "@/lib/actions/user/userMoveAction";

import { PI_Triangle, PI_Star, PI_Pentagon, PI_Square, PI_Diamond, PI_Crown, PI_FourPointedStar, PI_Drop, PI_Hexagon, PI_InvertedTriangle } from "./PortalIcons";

type Props = {
  thisRoomId: string;
  pathway: Pathway;
};

const PortalIconMap: { [key: number]: React.FC<{color: string}> } = {
  1: PI_Triangle,
  2: PI_Star,
  3: PI_Pentagon,
  4: PI_Square,
  5: PI_Diamond,
  6: PI_Crown,
  7: PI_FourPointedStar,
  8: PI_Drop,
  9: PI_Hexagon,
  10: PI_InvertedTriangle
};

export default function Portal({ thisRoomId, pathway }: Props) {
  const { figure_type, color } = pathway;
  const PortalIcon = PortalIconMap[figure_type];

  const handleClick = async (pathway: Pathway) =>  {
    // room_1またはroom_2のうち，現在の部屋ではない方を移動先roomとして渡す
    const targetRoomId = pathway.room_1_id === thisRoomId ? pathway.room_2_id : pathway.room_1_id
    await userMoveAction(targetRoomId)
  }

  return (
    <div onClick={() => handleClick(pathway)} className="cursor-pointer">
      <PortalIcon color={color} />
    </div>
  );
}
