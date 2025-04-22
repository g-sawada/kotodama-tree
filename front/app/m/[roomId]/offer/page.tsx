import { auth } from "@/auth";
import { redirect } from "next/navigation";

import Button from "@/components/ui/Button";
import CreateSoulsModalController from "@/features/offer/Offer/components/CreateSoulModalController";
import OfferSoulCardList from "@/features/offer/Offer/components/OfferSoulCardList";
import getSoulsAction from "@/lib/actions/soul/getSoulsAction";
import { getUser } from "@/lib/api/user/getUser";
import ErrorPage from "@/components/layout/ErrorPage";

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
  /**
   * 必要データの取得とエラー処理
   * - sessionからuserIdを取得
   * - userIdからユーザー情報を取得
   * いずれかがエラーの場合，エラーページを表示する
   */
  const session = await auth();
  if (!session || !session.user.userId) {
    return <ErrorPage />
  }
  const userId = session.user.userId;
  // ユーザー情報を取得
  const getUserResult = await getUser(userId);
  if (!getUserResult.isOk) {
    return <ErrorPage />
  }
  const user = getUserResult.body.data

  // URLパラメータからroomIdを取得。API rooms#showをコールして部屋情報を取得
  const { roomId: thisRoomId } = await params;
  // ⭐️ 捧げ部屋への入室認証は，専用layoutから呼び出すクライアントコンポーネントで行うように変更する
  // const getRoomInfoResult = await getRoomInfo(thisRoomId);

  // if (!getRoomInfoResult.isOk) {
  //   return <ErrorPage />
  // }
  // const roomInfo = getRoomInfoResult.body.data

  // // 部屋のuserIdと現在のuserIdが一致しない場合，アクセス権限がないのでリダイレクト
  // if (roomInfo.room.user_id !== userId) {
  //   // BUG: SSRページからsetFlashを実行する関数を呼ぶとエラーになる
  //   // setFlash("error", "この部屋にアクセスする権限がありません");
  //   redirect(`/m/${thisRoomId}`);
  // }

  // ユーザーの作成済みコトダマと作成上限数から，残りの作成可能数を算出
  // ⭐️ getSoulsActionではなくgetSoulsを使用。戻り値がエラーの場合はエラーメッセージを表示する
  const createdSouls = await getSoulsAction({ creator_id: userId });
  const creatableCount = user.max_create_souls - createdSouls.length;

  // ユーザーの手持ちのコトダマを取得
  // ⭐️ getSoulsActionではなくgetSoulsを使用。戻り値がエラーの場合はエラーメッセージを表示する
  const carryingSouls = await getSoulsAction({ owner_id: userId });

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
          <OfferSoulCardList souls={carryingSouls} roomId={thisRoomId} />
        </div>
      </div>
    </>
  );
}
