import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { getUser } from "@/lib/api/user/getUser";
import { getSouls } from "@/lib/api/soul/getSouls";
import ErrorPage from "@/components/layout/ErrorPage";

import CreateSoulsModalController from "@/features/offer/Offer/components/CreateSoulModalController";
import OfferSoulCardList from "@/features/offer/Offer/components/OfferSoulCardList";

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

  // URLパラメータからroomIdを取得
  const { roomId: thisRoomId } = await params;

  // ユーザーの作成済みコトダマを取得
  const getCreatedSoulsResult = await getSouls( { creator_id: userId });
  if (!getCreatedSoulsResult.isOk) {
    return <ErrorPage />
  }
  const createdSouls = getCreatedSoulsResult.body.data;
  // 作成済みコトダマの数とユーザー毎に設定される作成上限数から，残りの作成可能数を算出
  const creatableCount = user.max_create_souls - createdSouls.length;

  // ユーザーの手持ちのコトダマを取得
  const getCarryingSoulsResult = await getSouls({ owner_id: userId });
  if (!getCarryingSoulsResult.isOk) {
    return <ErrorPage />
  }
  const carryingSouls = getCarryingSoulsResult.body.data;

  // 戻るボタンのリダイレクト処理
  const backToMainPage = async () => {
    "use server";
    redirect(`/m/${thisRoomId}`);
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="absolute">
          <button className="ml-3 mt-3" onClick={backToMainPage}>⇐ もどる</button>
        </div>
        <h1 className="text-2xl text-center my-4 flex-none">
          捧げるコトダマを選択
        </h1>
        <div className="w-full mx-auto flex flex-col items-center flex-none">
          <div className="my-2">
            <CreateSoulsModalController creatableCount={creatableCount} />
          </div>
          <div className="mb-2">
          </div>
        </div>
        <div className="m-6 overflow-y-auto">
          <OfferSoulCardList souls={carryingSouls} roomId={thisRoomId} />
        </div>
      </div>
    </>
  );
}
