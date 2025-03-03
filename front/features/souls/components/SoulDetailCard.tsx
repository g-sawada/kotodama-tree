import Button from "@/components/ui/Button";
import { Soul } from "@/types/soul";

type Props = {
  soul: Soul;
  setSelectedSoul: (soul: Soul | null) => void;
};

export default function SoulDetailCard({ soul, setSelectedSoul }: Props) {
  const backToList = () => {
    setSelectedSoul(null);    // 選択中のコトダマをリセット
  };

  return (
    <>
      <div className="w-full rounded overflow-hidden shadow-lg bg-cyan-300">
        <div className="px-6 py-4">
          <div className="font-bold text-gray-700 text-xl mb-2">{soul.content}</div>
          <p className="text-gray-700 text-md">by 名無しさん</p>
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
