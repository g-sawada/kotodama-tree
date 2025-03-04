import Image from "next/image";
import { Soul } from "@/types/soul";

type Props = {
  soul: Soul;
  setSelectedSoul: (soul: Soul) => void;
};

export default function SoulCard({ soul, setSelectedSoul }: Props) {
  return (
    <>
      <div
        className="w-full rounded-lg overflow-hidden shadow-[0px_0px_15px_5px_#66e8f9] bg-cyan-300 hover:cursor-pointer"
        onClick={() => setSelectedSoul(soul)}
      >
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
    </>
  );
}
