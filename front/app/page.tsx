import { auth } from "@/auth";
import { setFlashAction } from "@/lib/actions/flash/setFlashAction";
import redirectToLastVisitRoomAction from "@/lib/actions/user/redirectToLastVisitRoom";
import { invalidateCache } from "@/lib/actions/maintenance/invalidateCache";

import { redirect } from "next/navigation";

import styles from '@/styles/top/ButtonAnimation.module.css';
import TopImage from "@/features/Top/ImageAnimationController";
import TopTitle from "@/features/Top/TitleAnimationController";

export default async function Home() {
  const session = await auth();
  const userId = session?.user?.userId

  // ボタンテスト用関数（不要になったら削除）
  const handleStartButtonClick = async () => {
    "use server";
    // Data Cacheの maintenanceを削除
    await invalidateCache();

    if(!userId) {
      // ログイン中かつuserIdがない場合，新規登録ページへ誘導
      redirect("/signup")
    }
    await setFlashAction("success", "最後に訪れた場所を読み込みました。");
    await redirectToLastVisitRoomAction()
    return;
  }

  const handleLoginButtonClick = async () => {
    "use server";
    // Data Cacheの maintenanceを削除
    await invalidateCache();

    // ログイン画面にリダイレクト
    redirect("/login")
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen transform -translate-y-10">
        <div className="text-3xl text-center">
          <TopTitle />
        </div>
        <div className="mt-8">
          <TopImage src="/tree.svg" alt="木の画像"/>
        </div>
        <div className="mt-8">
        { !!session ? 
          <button 
            onClick={handleStartButtonClick}
            className={`${styles.button} 
            px-4 py-2 font-bold border-2 border-white rounded transition bg-cyan-500 hover:bg-cyan-400`}>
              はじめる
          </button>
          :
          <button 
            onClick={handleLoginButtonClick}
            className={`${styles.button} 
            px-4 py-2 font-bold border-2 border-white rounded transition bg-gray-500 hover:bg-gray-400`}>
              ログインが必要です
          </button>
          }
        </div>
      </div>
  </>
  );
}
