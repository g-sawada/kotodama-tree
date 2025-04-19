import { auth } from "@/auth";
import { redirect } from "next/navigation";

import redirectToLastVisitRoomAction from "@/lib/actions/user/redirectToLastVisitRoom";
import { getRoomInfo } from "@/lib/api/room/getRoomInfo";

import Button from "@/components/ui/Button";
import CreateSoulsModalController from "@/features/offer/Offer/components/CreateSoulModalController";
import OfferSoulCardList from "@/features/offer/Offer/components/OfferSoulCardList";
import getSoulsAction from "@/lib/actions/soul/getSoulsAction";
import { getUser } from "@/lib/api/user/getUser";

/**
 * コトダマ捧げページコンポーネント
 * /m/:roomId/offer のルーティングに対応
 * @param roomId - URLパラメータから取得したroomId
 * 
 */

type Props = {
  params: Promise<{
    roomId: string;
  }>;
};

export default async function OfferPage({ params }: Props) {
  // sessionからuserIdを取得。取得できない場合はloginページにリダイレクト
  const session = await auth();
  if (!session || !session.user.userId) {
    redirect("/login");
  }
  const userId = session.user.userId;

  // コトダマ作成モーダルで使用するユーザー情報を取得
  const user = await getUser(userId);

  // URLパラメータからroomIdを取得。API rooms#showをコールして部屋情報を取得
  const { roomId: thisRoomId } = await params;
  const getRoomInfoResult = await getRoomInfo(thisRoomId);

  if (!getRoomInfoResult.isOk || !getRoomInfoResult.body.data) {
    // Not Foundエラーの場合，redirectToLastVisitRoomActionをコール
    // BUG: SSRページからsetFlashを実行する関数を呼ぶとエラーになる
    if(getRoomInfoResult.status === 404) {
      redirectToLastVisitRoomAction({ errorMessage: "アクセスに失敗しました" });
      return;
    }
    // その他のエラーの場合トップページにリダイレクト
    redirect("/");
  }
  const roomInfo = getRoomInfoResult.body.data

  // 部屋のuserIdと現在のuserIdが一致しない場合，アクセス権限がないのでリダイレクト
  if (roomInfo.room.user_id !== userId) {
    // BUG: SSRページからsetFlashを実行する関数を呼ぶとエラーになる
    // setFlash("error", "この部屋にアクセスする権限がありません");
    redirect(`/m/${thisRoomId}`);
  }

  // ユーザーの作成済みコトダマと作成上限数から，残りの作成可能数を算出
  const createdSouls = await getSoulsAction({ creator_id: userId });
  const creatableCount = user.max_create_souls - createdSouls.length;

  // ユーザーの手持ちのコトダマを取得
  const souls = await getSoulsAction({ owner_id: userId });

  // 戻るボタンのリダイレクト処理
  const backToMainPage = async () => {
    "use server";
    redirect(`/m/${thisRoomId}`);
  };

  return (
    <>
      <div>DEBUG: {`room.id: ${thisRoomId}`}, {`userId: ${userId}`}</div>
      <div className="flex-auto p-6 flex flex-col items-center space-between">
        <h1 className="text-2xl text-center my-4 flex-none">
          捧げるコトダマを選んでください
        </h1>
        <div className="w-full mx-auto flex flex-col items-center flex-none">
          <div className="my-2">
            <CreateSoulsModalController creatableCount={creatableCount}/>
          </div>
          <div className="mb-2">
            <Button
              text="もどる"
              handleClick={backToMainPage}
              buttonType="cancel"
            />
          </div>
        </div>
        <div className="w-full grow overflow-y-auto">
          <OfferSoulCardList souls={souls} roomId={thisRoomId} />
        </div>
      </div>
    </>
  );
}
