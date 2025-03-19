import { redirect } from "next/navigation";
import Button from "@/components/ui/Button";
import CreateSoulsModalController from "@/features/offer/Offer/components/CreateSoulModalController";
import OfferSoulCardList from "@/features/offer/Offer/components/OfferSoulCardList";
import { getSoulsByCreatorId, getSoulsByOwnerId } from "@/lib/api/soul/getSouls";
import { Soul } from "@/types/soul";

export default async function OfferPage() {
  // ユーザーIDをセッション情報から取得予定
  // const session = await auth();
  // const user_id = session.id
  const user_id = "abc";
  const treeId = "ABC";
  const souls: Soul[] = await getSoulsByOwnerId(user_id);
  const backToMainPage = async () => {
    'use server'
    // ユーザーのメインページにリダイレクト
    redirect("/mock")
  }
  // 現在のコトダマ作成可能数を算出（上限まであといくつか）
  const createdSouls: Soul[] = await getSoulsByCreatorId(user_id)
  const maxCreate: number = 8
  const remainingCreatableCount = maxCreate - createdSouls.length
  return (
    <>
      <div className="flex-auto p-6">
        <h1 className="text-2xl text-center my-4">
          捧げるコトダマを選んでください
        </h1>
        <div className="max-w-80 mx-auto flex flex-col items-center">
          <OfferSoulCardList souls={souls} treeId={treeId}/>
          <div className="my-4">
            <CreateSoulsModalController treeId={treeId} remainingCreatableCount={remainingCreatableCount}/>
          </div>
          <Button
            text="もどる"
            handleClick={backToMainPage}
            buttonType="cancel"
          />
        </div>
      </div>
    </>
  );
}
