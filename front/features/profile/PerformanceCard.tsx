
export default function PerformanceCard() {
  return (
    <>
    <div className="text-center">
      <div className="pb-10">
        {user.name}さん
        <div>のこれまでのじっせき</div>
      </div>
      <div className="grid grid-cols-2 pb-10">
        <div className="col-span-1">ユーザーレベル</div>
        <div className="col-span-1 ps-10">3</div>
      </div>
      <div className="grid grid-cols-2 pb-10">
        <div className="col-span-1">そうしゅうかく数</div>
        <div className="col-span-1 ps-10">1</div>
      </div>
      <div className="grid grid-cols-2 pb-10">
        <div className="col-span-1">いいね数</div>
        <div className="col-span-1 ps-10">0</div>
      </div>
      <div className="grid grid-cols-2 pb-10">
        <div className="col-span-1">ささげた回数</div>
        <div className="col-span-1 ps-10">4</div>
      </div>
    </div>
    </>
  );
}
