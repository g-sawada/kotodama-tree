import { auth } from "@/auth";
import { setFlashAction } from "@/lib/actions/flash/setFlashAction";
import redirectToLastVisitRoomAction from "@/lib/actions/user/redirectToLastVisitRoom";
import { invalidateCache } from "@/lib/actions/maintenance/invalidateCache";

import Button from "@/components/ui/Button";

export default async function Home() {
  const session = await auth();

  // ボタンテスト用関数（不要になったら削除）
  const handleButtonClick = async () => {
    "use server";
    console.log("ボタンがクリックされました");
    // フラッシュメッセージ用データをcookieに保存
    await setFlashAction("success", "TEST: 最後に訪れた場所 または ユーザーのホームに移動");

    // Data Cacheの maintenanceを削除
    await invalidateCache();

    await redirectToLastVisitRoomAction()
    return;
  }

  return (
    <>
      <div className="text-4xl text-center">コトダマノキ</div>
      <div className="flex mt-10 max-w-32 mx-auto justify-center items-center h-40 gap-4">
        <Button 
          text="はじめる"
          buttonType="ok"
          handleClick={handleButtonClick}
          // inProgress={true}
          // isDisabled={true}
        />
      </div>
    </>
  );
}
