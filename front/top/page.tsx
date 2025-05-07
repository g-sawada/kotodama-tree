import TopImage from "@/features/Top/ImageAnimationController";
import TopTitle from "@/features/Top/TitleAnimationController";
import TopButton from "@/features/Top/ButtonAnimationController";

export default function topPage() {
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen transform -translate-y-10">
        <div className="text-3xl text-center">
          <TopTitle />
        </div>
        <div className="mt-8">
          <TopImage src="/tree.svg" alt="木の画像"/>
        </div>
        <div className="mt-8">
          <TopButton />
        </div>
      </div>
    </>
  );
};
