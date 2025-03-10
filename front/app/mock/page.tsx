import Footer from "@/components/layout/Footer";
import PortalButtonComponent from "@/features/main/Portal/components/PortalButtonComponent";
import TreeSoulsModalController from "@/features/main/Tree/components/TreeSoulsModalController";

export default async function MockPage() {
  return (
    <>
      <div className="flex-auto">
        <h1 className="text-lg">ここはモックページ</h1>
        <div className="w-1/2 mx-auto flex flex-col items-center">
          <TreeSoulsModalController isRoomOwner={true}/>
        </div>
        <PortalButtonComponent />
      </div>
      <Footer />
    </>
  );
}
