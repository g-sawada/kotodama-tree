import { Soul } from "@/types/soul";
import EmptyHeartButton from "../EmptyHeartButton";

type Props = {
  soul: Soul;
  children?: React.ReactNode;
};

export default function SoulDetailCard({ soul, children }: Props) {
  return (
    <>
      <div className="w-full rounded-lg overflow-hidden shadow-[0px_0px_5px_2px_#66e8f9] bg-cyan-300">
        <div className="px-6 py-4">
          <div className="font-bold text-gray-700 text-xl mb-2">
            {soul.content}
          </div>
          {children}
          <div className="flex justify-between">
            <p className="text-gray-700 text-md">by 名無しさん</p>
            <EmptyHeartButton />
          </div>
        </div>
      </div>
    </>
  );
}
