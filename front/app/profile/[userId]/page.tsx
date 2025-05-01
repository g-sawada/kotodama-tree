import { auth } from "@/auth";
import Image from "next/image";

import { userProfile } from "@/lib/api/user/userProfile"
import ErrorPage from "@/components/layout/ErrorPage";

import SoulModalController from "@/features/profile/components/SoulModalController";

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { ProgressBar } from 'primereact/progressbar';

/**
 * プロフィール画面
 * /profile/:userId のルーティングに対応
 * @param userId - URLパラメータから取得したuserId
 */

type Props = {
  params: Promise<{
    userId: string;
  }>;
};

export default async function ProfilePage({ params }: Props) {
  /**
   * 必要データの取得とエラー処理
   * - URLパラメータからuserIdを取得
   * - userIdで API users#profileをコールし，プロフィール情報を取得
   * - sessionからuserIdを取得
   * いずれかがエラーの場合，エラーページを表示する
   */
  const { userId } = await params;
  const result = await userProfile(userId);
  if (!result.isOk) {
    return <ErrorPage /> ;
  }
  const { user, tree, souls } = result.body.data;
  
  const session = await auth();
  if (!session || !session.user.userId) {
    return <ErrorPage /> ;
  }
  const currentUserId = session.user.userId;

  // ページがログインユーザーのマイページであるかどうかを判定
  const isMyProfile = userId === currentUserId;

  return (
    <>
      <h1 className="mt-4 text-xl text-center">マイページ</h1>
      <div className="grid place-content-center grid-rows-1 gap-1 mt-5 m-5">
        <div className="row-span-1 border border-white rounded-lg mb-3">
          <div className="text-center py-4 text-lg">{user.name}</div>
        </div>

        <div className="row-span-2 border border-white rounded-lg p-5 grid grid-cols-12 mb-3 ">
          <Image src={`/${tree.image}`} width={130} height={130} alt="Tree Image" className="col-span-5"/>
          <div className="grid grid-rows-3 col-span-7">
            <p className="text-end rows-span-2">キのようす</p>
            <p className="text-end rows-span-1">Lv:{tree.level}</p>
            <div className="grid grid-cols-12 items-center gap-2">
              <p className="col-span-2">Exp</p>
              <ProgressBar className="col-span-10" value={tree.exp_progress_percent} showValue={false} style={{ width: "100%", height: "10px"}} />
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
