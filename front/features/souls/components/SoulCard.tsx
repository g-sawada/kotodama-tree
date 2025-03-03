import { Soul } from "@/types/soul";

type Props = {
  soul: Soul;
  setSelectedSoul: (soul: Soul) => void;
};

export default function SoulCard({ soul, setSelectedSoul }: Props) {
  return (
    <>
      <div 
        className="w-full rounded overflow-hidden shadow-lg bg-cyan-300"
        onClick={() => setSelectedSoul(soul)}
      >
        <div className="px-6 py-4">
          <div className="font-bold text-gray-700 text-xl mb-2">{soul.content}</div>
          <p className="text-gray-700 text-md">by 名無しさん</p>
        </div>
      </div>
    </>
  );
}
