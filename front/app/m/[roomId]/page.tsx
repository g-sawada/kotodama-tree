import { auth } from "@/auth";
import { getRoomInfo } from "@/lib/api/room/getRoomInfo";
import MoveButton from "./moveButton";

export default async function MainPage({ params }: { params: { roomId: string } }) {
  const { roomId: thisRoomId } = await params;
  const session = await auth();
  
  // 仮実装。実際はmiddlewareでリダイレクトされる
  if (!session) {
    return <div className="ml-3 mt-3">ログインしてください</div>
  }

  const result = await getRoomInfo(thisRoomId);
  // 仮実装。実際はエラーハンドリングを行う
  if (!result.isOk) {
    return <div className="ml-3 mt-3">roomId: {thisRoomId} はみつかりません</div>
  }

  const { room, pathways, tree } = result.body.data

  return (
    <>
      <div className="flex flex-col items-left mt-10 ml-6">
        ここは {`param roomId: ${thisRoomId}`} のページです

        <div>room: {room.id}</div>
        <div>pathways:</div>
        {pathways.map(pathway => 
          <div key={pathway.id}>
            id: {pathway.id}, room_1: {pathway.room_1_id}, room_2: {pathway.room_2_id}
          </div>)}
        <div>tree: {tree.id}</div>
      </div>

      <div className="flex flex-col items-center justify-center gap-y-4 mt-10">
        {pathways.map(pathway => 
          <div key={pathway.id}>
            {/* 仮の移動用ボタン。実際はポータルボタンで行う */}
            <MoveButton thisRoomId={thisRoomId} pathway={pathway}/>
          </div>
        )}
      </div>
    </>
  )
}
