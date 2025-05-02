import React from "react";
import Button from "@/components/ui/Button";
import DemoModalController from "@/features/demo/components/DemoModalController";
import SignInButton from "@/components/ui/authButton/SignInButton";
import { auth } from "@/auth";
import { setFlashAction } from "@/lib/actions/flash/setFlashAction";
import redirectToLastVisitRoomAction from "@/lib/actions/user/redirectToLastVisitRoom";
import { invalidateCache } from "@/lib/actions/maintenance/invalidateCache";

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

  // 外部接続テスト
  const trafficTest = async () =>  {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    // console.log("response");
    // console.log(response);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const body =  await response.json();
    return body
  }

  const test = await trafficTest();

  return (
    <>
      <div className="text-4xl text-center">ここはHomeページです</div>
      <div className="flex max-w-32 mx-auto justify-center items-center h-40 gap-4">
        <Button 
          text="はじめる"
          buttonType="ok"
          handleClick={handleButtonClick}
          // inProgress={true}
          // isDisabled={true}
        />
      </div>
      <div className="my-4">
        <p className="flex justify-center font-bold">current_user session</p>
        <pre className="flex justify-center text-sm">{JSON.stringify(session, null, 2)}</pre>
      </div>

      <div className="flex flex-col mx-auto justify-center items-center gap-4">
        <SignInButton provider="github"/>
        <SignInButton provider="google"/>
        <SignInButton provider="twitter"/>
      </div>

      <div className="flex flex-col justify-center items-center my-4">
        <div>環境変数チェック</div>
        <p className="text-sm">API_URL: {process.env.API_URL}</p>
        <p className="text-sm">AUTH_GOOGLE_ID: {process.env.AUTH_GOOGLE_ID}</p>
      </div>

      <pre className="flex justify-center text-sm">{JSON.stringify(test.title, null, 2)}</pre>

      <div className="flex justify-center items-center my-10">
        <DemoModalController />
      </div>
    </>
  );
}
