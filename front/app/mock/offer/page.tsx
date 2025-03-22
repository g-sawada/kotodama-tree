import { redirect } from "next/navigation";
import Button from "@/components/ui/Button";
import CreateSoulsModalController from "@/features/offer/Offer/components/CreateSoulModalController";
import OfferSoulCardList from "@/features/offer/Offer/components/OfferSoulCardList";
import {
  getSoulsByCreatorId,
  getSoulsByOwnerId,
} from "@/lib/api/soul/getSouls";
import { Soul } from "@/types/soul";

export default async function OfferPage() {
  // 捧げるページへの認証ロジック
  // const session = auth();
  // const user = await getUserInfo(session.userId);
  // const thisRoomId = <URLから取得したroom.id>
  // if (thisRoomId !==  user.last_visit_room) {
  //     redirect(`/${last_visit_room}`)
  // }
  const user_id = "abc";
  const treeId = "ABC";
  const souls: Soul[] = await getSoulsByOwnerId(user_id);
  const backToMainPage = async () => {
    "use server";
    // ユーザーのメインページにリダイレクト
    redirect("/mock");
  };
  // 現在のコトダマ作成可能数を算出（上限まであといくつか）
  const createdSouls: Soul[] = await getSoulsByCreatorId(user_id);
  const maxCreate: number = 8;
  const remainingCreatableCount = maxCreate - createdSouls.length;
  return (
    <>
      <div className="flex-auto p-6 flex flex-col items-center space-between">
        
        <h1 className="text-2xl text-center my-4 flex-none">
          捧げるコトダマを選んでください
        </h1>
        <div className="w-full mx-auto flex flex-col items-center flex-none">
          <div className="my-2">
            <CreateSoulsModalController
              treeId={treeId}
              remainingCreatableCount={remainingCreatableCount}
            />
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
            <OfferSoulCardList souls={souls} treeId={treeId} />
          </div>
        
      </div>
    </>
  );
}
