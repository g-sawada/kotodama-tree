import { Soul } from "@/types/soul";
import Button from "../Button";
import EmptyHeartButton from "../EmptyHeartButton";

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
      <div className="w-full rounded-lg overflow-hidden shadow-[0px_0px_5px_2px_#66e8f9] bg-cyan-300">
        <div className="px-6 py-4">
          <div className="font-bold text-gray-700 text-xl mb-2">
            {soul.content}
          </div>
          {soul.exp && (
            <p className="w-24 text-gray-700 bg-white rounded-xl px-2 text-center my-2">
              exp: {soul.exp}
            </p>
          )}
          <div className="flex justify-between">
            <p className="text-gray-700 text-md">by 名無しさん</p>
            <EmptyHeartButton />
          </div>
        </div>
      </div>
      {!soul.exp && (
        <div className="flex justify-center my-4">
          <Button
            text="しゅうかくする"
            handleClick={() => router.push("#")}
            buttonType="ok"
          />
        </div>
      )}
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
