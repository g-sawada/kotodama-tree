import { auth } from "@/auth";

import { getRoomInfo } from "@/lib/api/room/getRoomInfo";
import { getUser } from "@/lib/api/user/getUser";

import Footer from "@/components/layout/Footer";
import TreeSoulsModalController from "@/features/main/Tree/components/TreeSoulsModalController";
import PortalButtonComponent from "@/features/main/Portal/components/PortalButtonComponent";
import ChargeButton from "@/features/main/Charge/components/ChargeButton";
import HomePortalButton from "@/features/main/HomePortal/components/HomePortalButton";
import ErrorPage from "@/components/layout/ErrorPage";

type Props = {
  params: Promise<{
    roomId: string;
  }>;
};

export default async function MainPage({ params }: Props) {
  /**
   * 必要データの取得とエラー処理
   * - sessionからuserIdを取得
   * - userIdで API users#showをコールし，ユーザー情報を取得
   * - URLパラメータからthisRoomIdを取得
   * - thisRoomIdで API rooms#showをコールし，部屋情報を取得
   * いずれかがエラーの場合，エラーページを表示する
   */
  const session = await auth();
  if (!session || !session.user.userId) {
    return <ErrorPage />
  }
  const userId = session?.user.userId;
  // ユーザー情報を取得
  const getUserResult = await getUser(userId);
  if (!getUserResult.isOk) {
    return <ErrorPage />
  }
  const user = getUserResult.body.data;

  // URLパラメータからroomIdを取得。API rooms#showをコールして部屋情報を取得
  const { roomId: thisRoomId } = await params;
  const getRoomInfoResult = await getRoomInfo(thisRoomId);
  if (!getRoomInfoResult.isOk) {
    return <ErrorPage />
  }

  // APIのレスポンスからroom，pathways, treeを取得
  const { room, pathways, tree } = getRoomInfoResult.body.data
  // 部屋のオーナーかどうかを判定
  const isRoomOwner = room.user_id === userId;

  return (
    <>
      <div>DEBUG: 確認用 {`room.id: ${room.id}, pathways.length: ${pathways.length}, tree.id: ${tree.id} `}</div>
      <div className="flex-auto">
        <div className="w-64 mx-auto flex flex-col items-center">
          <TreeSoulsModalController tree={tree} isRoomOwner={isRoomOwner} user={user}/>
          <PortalButtonComponent thisRoomId={thisRoomId} pathways={pathways} />
          <div className="text-center my-4 md:my-8">
          {isRoomOwner ? 
            <ChargeButton tree={tree} /> :
            <HomePortalButton thisRoomId={room.id}/>}
          </div>
        </div>
      </div>
      <Footer isRoomOwner={isRoomOwner}/>
    </>
  )
}
