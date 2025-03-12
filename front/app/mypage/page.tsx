import React from "react";
import MyPagesModalController from "@/features/main/MyPages/components/MyPagesModalController";
import { ProgressBar } from 'primereact/progressbar';
import Button from '@/components/ui/Button';
import { User } from '@/types/user';
import { Soul } from "@/types/soul";
import { Tree } from "@/types/tree";
import { getUserBySoulCreatorIdAction, getUsersIdAction, getUserByTreeIdAction } from "@/lib/actions/getUsers";


export default async function MyPage() {
  const useruuId = "abc123";
  const user: User = await getUsersIdAction(useruuId);
  const souls: Soul[] = await getUserBySoulCreatorIdAction(useruuId);
  const tree: Tree = await getUserByTreeIdAction(useruuId);

  return (
    <>
    <h1 className="mt-2 ml-2">マイページ</h1>
    <div className="grid place-content-center grid-rows-1 gap-1 mt-10 m-5">
      <div className="row-span-1 border border-white rounded-lg">
        <div className="text-center">{user.name}</div>
      </div>
      <div className="row-span-2 border border-white rounded-lg p-2 grid grid-cols-12">
        <img src="/キ.svg" className="h-40 w-27 col-span-5"></img>
        <div className="grid grid-rows-3 col-span-7">
          <div className="text-end rows-span-2">キのようす</div>
          <div className="text-end rows-span-1">Lv:{tree.level}
            <div className="grid grid-cols-12 items-center gap-2">
              <div className="col-span-2">Exp</div>
              <ProgressBar className="col-span-10" value={tree.exp} showValue={false} style={{ width: "100%", height: "10px"}}></ProgressBar>
            </div>
          </div>
        </div>
      </div>
      <div className="row-span-2 border border-white rounded-lg p-2 grid grid-cols-12">
        <img src="/コトダマ.svg" className="w-20 h-20 col-span-4"></img>
        <div className="col-span-8">
          <div className="pb-3">コトダマ作成数 {souls.length}</div>
            <MyPagesModalController user={user} souls={souls} />
          </div>
        </div>
        <Button text="じっせき" className="bg-gray-500"/>
    </div>
    </>
  )
}
