import Button from "@/components/ui/Button";
import CreateSoulsModalController from "@/features/offer/Offer/components/CreateSoulModalController";
import OfferSoulCardList from "@/features/offer/Offer/components/OfferSoulCardList";
import { getSoulsByOwnerId } from "@/lib/api/soul/getSouls";
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
    console.log("メインページにリダイレクト")
  }
  return (
    <>
      <div className="flex-auto p-6">
        <h1 className="text-2xl text-center my-4">
          捧げるコトダマを選んでください
        </h1>
        <div className="max-w-80 mx-auto flex flex-col items-center">
          <OfferSoulCardList souls={souls} />
          <div className="mt-8 mb-4">
            <CreateSoulsModalController treeId={treeId}/>
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
