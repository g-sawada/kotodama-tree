import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { setFlash } from "@/lib/api/flash/setFlash";
import getSoulsAction from "@/lib/actions/soul/getSoulsAction";
import getUserAction from "@/lib/actions/user/getUserAction";

import Button from "@/components/ui/Button";
import CreateSoulsModalController from "@/features/offer/Offer/components/CreateSoulModalController";
import OfferSoulCardList from "@/features/offer/Offer/components/OfferSoulCardList";

/**
 * コトダマ捧げページコンポーネント
 * /m/:roomId/offer のルーティングに対応
 * @param roomId - URLパラメータから取得したroomId
 * 
 */

export default async function OfferPage({ params }: { params: { roomId: string } }) {
  // sessionからuserIdを取得。取得できない場合はloginページにリダイレクト
  const session = await auth();
  if (!session || !session.user.userId) {
    redirect("/login");
  }
  const userId = session.user.userId;

  // コトダマ作成モーダルで使用するユーザー情報を取得
  const user = await getUserAction()
  if (!user) {
    setFlash("error", "ユーザー情報の取得に失敗しました");
    redirect("/login");
  }

  // ユーザーの作成済みコトダマと作成上限数から，残りの作成可能数を算出
  const createdSouls = await getSoulsAction({ creator_id: userId });
  const creatableCount = user.max_create_souls - createdSouls.length;

  // URLパラメータからroomIdを取得
  const { roomId: thisRoomId } = await params;

  // 手持ちのコトダマを取得
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
