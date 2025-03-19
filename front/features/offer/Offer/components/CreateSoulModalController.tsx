"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";
import FullSizeModal from "@/components/ui/FullSizeModal";

/**
 * コトダマ作成用のモーダルコントローラー
 *
 *
 *
 *
 */

export default function CreateSoulsModalController() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // モーダルの開閉制御
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleClick = () => {
    console.log()
  }



  return (
    <>
      <Button
        text="新たにコトダマを創る"
        buttonType="ok"
        handleClick={() => openModal()}
      />

      <div>
        <FullSizeModal isOpen={isModalOpen}>
          <h1 className="text-center text-xl font-bold">コトダマを創る</h1>
            <form className="my-8 flex flex-col items-center">
              <textarea
                name="content"
                className="bg-gray-900 border-white border-2 rounded-lg w-[90%] h-[90%] overflow-y-auto my-4 h-20 max-w-80"
                placeholder="コトダマを入力してください"
              ></textarea>
              <Button
              text="コトダマを捧げる"
              handleClick={() => handleClick()}
              buttonType="ok"
            />
            </form>
          <div className="flex justify-center my-4">
            <Button
              text="閉じる"
              handleClick={() => closeModal()}
              buttonType="cancel"
            />
          </div>
        </FullSizeModal>
      </div>
    </>
  );
}
