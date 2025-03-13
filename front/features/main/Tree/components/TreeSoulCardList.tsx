// import * as React from 'react' paramsの取得に必要？
import EmptyHeartButton from "@/components/ui/EmptyHeartButton";
import SoulCard from "@/components/ui/SoulCard/SoulCard";
import { Soul } from "@/types/soul";

type Props = {
  souls: Soul[];
  setSelectedSoul: (soul: Soul) => void;
  // params: Promise<{ roomId: string }>;
};

export default function TreeSoulCardList({ souls, setSelectedSoul }: Props) {
  // const { id } = React.use(params)
  // const { data: session } = useSession() セッション情報もここで取得予定
  // 上記URL上のroom_idに紐づくuser_idとsession情報のuser_idが一致するか判定し、displayExpにbooleanを格納
  const displayExp = true;
  return (
    <>
      <div className="mx-auto w-full">
        <div className="flex flex-col gap-6 items-center">
          {souls.map((soul: Soul) => (
            <SoulCard
              key={soul.id}
              soul={soul}
              setSelectedSoul={setSelectedSoul}
            >
              {displayExp && (
                <p className="w-24 text-gray-700 bg-white rounded-xl px-2 text-center my-2 shadow-[0px_0px_5px_2px_#fff]">
                  exp: {soul.exp}
                </p>
              )}
              <div className="flex justify-between">
                <p className="text-gray-700 text-md">by 名無しさん</p>
                <EmptyHeartButton />
              </div>
            </SoulCard>
          ))}
        </div>
      </div>
    </>
  );
}
