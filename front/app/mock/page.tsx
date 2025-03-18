import Footer from "@/components/layout/Footer";
import ChargeButton from "@/features/main/Charge/components/ChargeButton";
import HomePortalButton from "@/features/main/HomePortal/components/HomePortalButton";
import PortalButtonComponent from "@/features/main/Portal/components/PortalButtonComponent";
import TreeSoulsModalController from "@/features/main/Tree/components/TreeSoulsModalController";

export default async function MockPage() {
  const treeId = "ABC";
  const isRoomOwner = true;
  // ここでtreeデータを元にチャージ可否を判定、canChargeにbooleanを格納予定
  const canCharge = true;
  return (
    <>
      <div className="flex-auto">
        <h1 className="text-lg">ここはモックページ</h1>
        <div className="w-64 md:w-80 mx-auto flex flex-col items-center">
          <TreeSoulsModalController treeId={treeId} isRoomOwner={isRoomOwner} />
        </div>
        <PortalButtonComponent />
        <div className="text-center my-4 md:my-8">
        {isRoomOwner ? <ChargeButton treeId={treeId} canCharge={canCharge}/> : <HomePortalButton />}
        </div>
      </div>
      <Footer />
    </>
  );
}
