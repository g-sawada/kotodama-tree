import React from "react";
import Image from "next/image";
import { auth } from "@/auth";

import SoulModalController from "@/features/profile/components/SoulModalController";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { ProgressBar } from 'primereact/progressbar';
import { userProfile } from "@/lib/api/user/userProfile"

/**
 * プロフィール画面
 * /profile/:userId のルーティングに対応
 * @param userId - URLパラメータから取得したuserId
 * 
 */

export default async function ProfilePage({ params }: { params: { userId: string } }) {
  const { userId } = params;
  const result = await userProfile(userId);

  if (!result.isOk) {
    return <div>エラー: {result.body.error}</div>;
  }

  const { user, tree, souls } = result.body.data;
  const session = await auth();
  const myUserId = session?.user?.userId;

  /**isMyProfileにtrueかfalseを格納 */
  const isMyProfile = userId === myUserId;

  return (
    <>
    <h1 className="mt-4 text-center">マイページ</h1>
    <div className="grid place-content-center grid-rows-1 gap-1 mt-5 m-5">
      <div className="row-span-1 border border-white rounded-lg mb-3">
        <div className="text-center py-4 text-lg">{user.name}</div>
      </div>
      <div className="row-span-2 border border-white rounded-lg p-5 grid grid-cols-12 mb-3 ">
        <Image src={`/${tree.image}`} width={130} height={130} alt="Tree Image" className="col-span-5"/>
        <div className="grid grid-rows-3 col-span-7">
          <div className="text-end rows-span-2">キのようす</div>
          <div className="text-end rows-span-1">Lv:{tree.level}
            <div className="grid grid-cols-12 items-center gap-2">
              <div className="col-span-2">Exp</div>
              <ProgressBar className="col-span-10" value={tree.exp_progress_percent} max={100} showValue={false} style={{ width: "100%", height: "10px"}}></ProgressBar>
            </div>
          </div>
        </div>
      </div>
      <div className="row-span-2 border border-white rounded-lg p-2 py-5 grid grid-cols-12 mb-5">
        <Image src="/soul.svg" width={90} height={90} alt="Soul Image" className="col-span-4"/>
        <div className="col-span-8">
          <div className="pb-3">コトダマ作成数 {souls.length} / {user.max_create_souls}</div>
            <SoulModalController user={user} tree={tree} souls={souls} isMyProfile={isMyProfile}/>
          </div>
        </div>
    </div>
    </>
  )
}
