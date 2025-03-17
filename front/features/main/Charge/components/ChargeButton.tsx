"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import ResizeModal from "@/components/ui/ResizeModal";

type Props = {
  treeId: string;
};

export default function ChargeButton(treeId: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // チャージ可能状態かどうかを取得
  // try {
  //   const canCharge: boolean = await getCanChargeByTreeIdAction(treeId);
  // } catch (error) {
  //   console.error(error);
  // }
  const canCharge = false;

  // モーダルの開閉制御

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Modal展開ボタンをクリックした時の処理
  const openModal = async () => {
    setIsModalOpen(true);
  };

  const handleClickCharge = () => {
    try {
      console.log("チャージ実行");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {canCharge ? (
        <button onClick={() => openModal()}>
          <Image src="charge.svg" alt="charge_icon" width={64} height={64} />
        </button>
      ) : (
        <button disabled>
          <Image
            src="charge_disabled.svg"
            alt="charge_icon"
            width={64}
            height={64}
          />
        </button>
      )}

      <div>
        <ResizeModal isOpen={isModalOpen}>
          <div className="flex flex-col justify-center gap-4 mt-6">
            <p className="text-center text-lg">チャージを実行しますか？</p>
            <div className="flex justify-center my-4 gap-6">
              <Button
                text="Cancel"
                buttonType="cancel"
                handleClick={() => closeModal()}
              />
              <Button
                text="OK"
                buttonType="ok"
                handleClick={handleClickCharge}
              />
            </div>
          </div>
        </ResizeModal>
      </div>
    </>
  );
}
