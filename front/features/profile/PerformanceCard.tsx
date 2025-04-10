import { User } from "@/types/user";
import { Performance } from "@/types/performance";

type Props = {
  user: User;
  performance: Performance;
};

export default function PerformanceCard({ user, performance }: Props) {
  return (
    <>
    <div className="text-center">
      <div className="pb-10">
        {user.name}さん
        <div>のこれまでのじっせき</div>
      </div>
      <div className="grid grid-cols-2 pb-10">
        <div className="col-span-1">ユーザーレベル</div>
        <div className="col-span-1 ps-10">{user.level}</div>
      </div>
      <div className="grid grid-cols-2 pb-10">
        <div className="col-span-1">そうしゅうかく数</div>
        <div className="col-span-1 ps-10">{performance.souls_harvested}</div>
      </div>
      <div className="grid grid-cols-2 pb-10">
        <div className="col-span-1">いいね数</div>
        <div className="col-span-1 ps-10">{performance.sum_of_likes}</div>
      </div>
      <div className="grid grid-cols-2 pb-10">
        <div className="col-span-1">ささげた回数</div>
        <div className="col-span-1 ps-10"></div>
      </div>
    </div>
    </>
  );
}
