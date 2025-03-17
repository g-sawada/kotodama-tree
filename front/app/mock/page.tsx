import Footer from "@/components/layout/Footer";
import ChargeButton from "@/features/main/Charge/components/ChargeButton";
import HomePortalButton from "@/features/main/HomePortal/components/HomePortalButton";
import PortalButtonComponent from "@/features/main/Portal/components/PortalButtonComponent";
import TreeSoulsModalController from "@/features/main/Tree/components/TreeSoulsModalController";

export default async function MockPage() {
  const treeId = "ABC";
  const isRoomOwner = true;
  return (
    <>
      <div className="flex-auto">
        <h1 className="text-lg">ここはモックページ</h1>
        <div className="w-80 mx-auto flex flex-col items-center">
          <TreeSoulsModalController treeId={treeId} isRoomOwner={isRoomOwner} />
        </div>
        <PortalButtonComponent />
        <div className="text-center my-8">
        {isRoomOwner ? <ChargeButton treeId={treeId}/> : <HomePortalButton />}
        </div>
      </div>
      <Footer />
    </>
  );
}
