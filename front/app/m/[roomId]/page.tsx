import { redirect } from "next/navigation";
import { auth } from "@/auth";

import { getRoomInfo } from "@/lib/api/room/getRoomInfo";
import { getUser } from "@/lib/api/user/getUser";
import redirectToLastVisitRoomAction from "@/lib/actions/user/redirectToLastVisitRoom";
import { setFlash } from "@/lib/api/flash/setFlash";

import Footer from "@/components/layout/Footer";
import TreeSoulsModalController from "@/features/main/Tree/components/TreeSoulsModalController";
import PortalButtonComponent from "@/features/main/Portal/components/PortalButtonComponent";
import ChargeButton from "@/features/main/Charge/components/ChargeButton";
import HomePortalButton from "@/features/main/HomePortal/components/HomePortalButton";

type Props = {
  params: Promise<{
    roomId: string;
  }>;
};

export default async function MainPage({ params }: Props) {
  // sessionからuserIdを取得。取得できない場合はloginページにリダイレクト
  const session = await auth();
  if (!session || !session.user.userId) {
    redirect("/login");
  }
  const userId = session.user.userId;
  // ユーザー情報を取得
  const user = await getUser(userId);

  // URLパラメータからroomIdを取得。API rooms#showをコールして部屋情報を取得
  const { roomId: thisRoomId } = await params;
  const getRoomInfoResult = await getRoomInfo(thisRoomId);

  if (!getRoomInfoResult.isOk) {
    // Not Foundエラーの場合，redirectToLastVisitRoomActionをコール
    if (getRoomInfoResult.status === 404) {
      redirectToLastVisitRoomAction({ errorMessage: "アクセスに失敗しました" });
      return;
    }
    // その他のエラーの場合トップページにリダイレクト
    setFlash("error", "エラーが発生しました");
    redirect("/");
  }

  // APIのレスポンスからroom，pathways, treeを取得
  const { room, pathways, tree, roomOwnerName } = getRoomInfoResult.body.data;
  // 部屋のオーナーかどうかを判定
  const isRoomOwner = room.user_id === userId;

  return (
    <>
      <div className="flex-auto max-w-sm mx-auto p-4">
        <h1 className="text-center text-xl">{roomOwnerName}さんのコトダマのキ</h1>
        </div>
        <div className="w-64 mx-auto flex flex-col items-center">
          <TreeSoulsModalController
            tree={tree}
            isRoomOwner={isRoomOwner}
            user={user}
          />
        </div>
        <PortalButtonComponent thisRoomId={thisRoomId} pathways={pathways} />
        <div className="text-center my-4 md:my-8">
          {isRoomOwner ? (
            <ChargeButton tree={tree} />
          ) : (
            <HomePortalButton thisRoomId={room.id} />
          )}
        </div>
      
      <Footer isRoomOwner={isRoomOwner} />
    </>
  );
}
