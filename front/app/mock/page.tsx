import Footer from "@/components/layout/Footer";
import PortalButtonComponent from "@/features/main/Portal/components/PortalButtonComponent";
import TreeSoulsModalController from "@/features/main/Tree/components/TreeSoulsModalController";

export default async function MockPage() {
  const treeId = "ABC";
  return (
    <>
      <div className="flex-auto">
        <h1 className="text-lg">ここはモックページ</h1>
        <div className="w-80 md:w-96 mx-auto flex flex-col items-center">
          <TreeSoulsModalController treeId={treeId} isRoomOwner={true}/>
        </div>
        <PortalButtonComponent />
      </div>
      <Footer />
    </>
  );
}
