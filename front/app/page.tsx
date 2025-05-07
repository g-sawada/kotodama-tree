import { auth } from "@/auth";
import { setFlashAction } from "@/lib/actions/flash/setFlashAction";
import redirectToLastVisitRoomAction from "@/lib/actions/user/redirectToLastVisitRoom";
import { invalidateCache } from "@/lib/actions/maintenance/invalidateCache";

import Button from "@/components/ui/Button";
import { redirect } from "next/navigation";

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
      <div className="text-4xl text-center my-10">コトダマノキ</div>
      <div className="flex mt-10 max-w-32 mx-auto justify-center items-center h-40 gap-4">
        { !!session ? 
            <div className="flex flex-col items-center gap-4 min-w-40">
              <Button 
                text="はじめる"
                buttonType="ok"
                handleClick={handleStartButtonClick}
              />
            </div>
            :  
            <div className="flex flex-col items-center gap-4 min-w-40">
              <p className="text-gray-500">ログインが必要です</p>
              <Button 
                text="ログインする"
                buttonType="cancel"
                handleClick={handleLoginButtonClick}
              />
            </div>
        }
      </div>
    </>
  );
}
