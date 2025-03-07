import Footer from "@/components/layout/Footer";
import PortalButtonComponent from "@/features/main/Portal/components/PortalButtonComponent";

export default async function MockPage() {
  return (
    <>
      <div className="flex-auto">
        <h1 className="text-lg">ここはモックページ</h1>
        <div className="flex w-full justify-center items-center h-60 gap-4">
          キの画像
        </div>
        <PortalButtonComponent />
      </div>
      <Footer />
    </>
  );
}
