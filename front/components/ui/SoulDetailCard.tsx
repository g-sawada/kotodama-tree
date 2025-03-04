import Image from "next/image"
import { Soul } from "@/types/soul";
import Button from "./Button";

type Props = {
  soul: Soul;
  setSelectedSoul: (soul: Soul | null) => void;
};

export default function SoulDetailCard({ soul, setSelectedSoul }: Props) {
  const backToList = () => {
    setSelectedSoul(null); // 選択中のコトダマをリセット
  };

  return (
    <>
      <div className="w-full rounded-lg overflow-hidden shadow-[0px_0px_15px_5px_#66e8f9] bg-cyan-300">
        <div className="px-6 py-4">
          <div className="font-bold text-gray-700 text-xl mb-2">
            {soul.content}
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700 text-md">by 名無しさん</p>
            <Image
              src="icon_images/heart.svg"
              alt="heart"
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center my-4">
        <Button
          text="一覧にもどる"
          handleClick={backToList}
          buttonType="cancel"
        />
      </div>
    </>
  );
}
