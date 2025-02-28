import Button from "@/components/ui/Button";
import React from "react";

export default function Home() {
  
  // ボタンテスト用関数（不要になったら削除）
  const handleButtonClick = async () => {
    "use server";
    console.log("ボタンがクリックされました");
  }


  return (
    <>
      <div className="text-4xl text-center">ここはHomeページです</div>
      <div className="flex max-w-32 mx-auto justify-center items-center h-60 gap-4">
        <Button 
          text="ボタン"
          buttonType="ok"
          handleClick={handleButtonClick}
          // inProgress={true}
          // isDisabled={true}
        />
      </div>
    </>
  );
}
