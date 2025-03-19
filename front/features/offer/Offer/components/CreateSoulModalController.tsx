"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";
import FullSizeModal from "@/components/ui/FullSizeModal";
import { createSoulAction } from "@/lib/actions/createSoul";

/**
 * コトダマ作成用のモーダルコントローラー
 *
 *
 */

type Props = {
  treeId: string;
  remainingCreatableCount: number;
};
export default function CreateSoulsModalController({ treeId, remainingCreatableCount }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // モーダルの開閉制御
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleClick = () => {
    console.log();
  };

  return (
    <>
      {remainingCreatableCount === 0 && (<p>コトダマ作成上限に達しています</p>)}
      <div className="text-center">
      <Button
        text="新たにコトダマを創る"
        buttonType="ok"
        handleClick={() => openModal()}
        isDisabled={remainingCreatableCount === 0} // 作成上限に達している場合はdisable
      />
      </div>

      <div>
        <FullSizeModal isOpen={isModalOpen}>
          <h1 className="text-center text-xl font-bold">コトダマを創る</h1>
          <form action={createSoulAction} className="my-8 flex flex-col items-center">
            <p>作成可能コトダマ数：あと{remainingCreatableCount}個</p>
            <textarea
              name="content"
              className="bg-gray-900 border-white border-2 rounded-lg w-[90%] h-[90%] overflow-y-auto my-4 h-20 max-w-80"
              placeholder="コトダマを入力してください"
            ></textarea>
            <input type="hidden" value={treeId} name="tree_id"/>
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
