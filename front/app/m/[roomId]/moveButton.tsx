// 仮のコンポーネント
'use client'

import userMoveAction from "@/lib/actions/user/userMoveAction"

export default function MoveButton({pathway, thisRoomId}) {
  const handleClick = (pathway) =>  {
    // room_1またはroom_2のうち，現在の部屋ではない方を移動先roomとして渡す
    const targetRoomId = pathway.room_1_id === thisRoomId ? pathway.room_2_id : pathway.room_1_id
    userMoveAction(targetRoomId)
  }

  return (
    <button onClick={() => handleClick(pathway)} className="bg-gray-200 hover:bg-gray-300 text-black border-black font-bold py-2 px-4 rounded">
      {pathway.room_1_id === thisRoomId ? pathway.room_2_id : pathway.room_1_id}  に移動
    </button>
  )
}


