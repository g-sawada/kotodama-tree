import { Soul } from "@/types/soul";

type Props = {
  soul: Soul;
  handleCardClick?: () => void;   
  // swd修正🐘: 共通コンポーネントに対して特定の関数を強制すると依存性が高まるので，「目的の関数を実行する関数（関数式）」を受けるようにします。
  // こうすれば，特定の機能を持つ関数を要求せずに済みます。任意propにして，なくてもOKとします。
  children: React.ReactNode;
};

export default function SoulCard({ soul, handleCardClick, children }: Props) {
  return (
    <div
      className="w-full rounded-lg overflow-hidden shadow-[0px_0px_5px_2px_#66e8f9] bg-cyan-300 hover:cursor-pointer"
      onClick={handleCardClick ? handleCardClick : undefined}   // swd修正🐘: handleCardClickが無い場合はundefinedとなり，onClickは起動しない
    >
      <div className="px-6 py-4">
        <div className="font-bold text-gray-700 text-xl mb-2">
          {soul.content}
        </div>
        {children}
      </div>
    </div>
  );
}
