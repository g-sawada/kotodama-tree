import { Soul } from "@/types/soul";

type Props = {
  soul: Soul;
  setSelectedSoul: (soul: Soul) => void;
  children: React.ReactNode;
};

export default function SoulCard({ soul, setSelectedSoul, children }: Props) {
  return (
    <>
      <div
        className="w-full rounded-lg overflow-hidden shadow-[0px_0px_5px_2px_#66e8f9] bg-cyan-300 hover:cursor-pointer"
        onClick={() => setSelectedSoul(soul)}
      >
        <div className="px-6 py-4">
          <div className="font-bold text-gray-700 text-xl mb-2">
            {soul.content}
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
