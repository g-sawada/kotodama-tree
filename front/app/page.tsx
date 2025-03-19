import React from "react";
import Button from "@/components/ui/Button";
import DemoModalController from "@/features/demo/components/DemoModalController";
import SignInButton from "@/components/ui/authButton/SignInButton";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { setFlash } from "@/lib/api/flash/setFlash";

export default async function Home() {
  const session = await auth();

  // ボタンテスト用関数（不要になったら削除）
  const handleButtonClick = async () => {
    "use server";
    console.log("ボタンがクリックされました");
    // フラッシュメッセージ用データをcookieに保存
    setFlash("success", "処理成功");

    console.log("mockページにリダイレクトします");
    redirect("/mock")
  }


  return (
    <>
      <div className="text-4xl text-center">ここはHomeページです</div>
      <div className="flex max-w-32 mx-auto justify-center items-center h-40 gap-4">
        <Button 
          text="ボタン"
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

      <div className="flex justify-center items-center my-10">
        <DemoModalController />
      </div>
    </>
  );
}
