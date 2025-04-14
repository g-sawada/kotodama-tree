"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import ResizeModal from "@/components/ui/ResizeModal";
import { Tree } from "@/types/tree";
import { CHARGE_INTERVAL } from "@/constants";
import chargeAction from "@/lib/actions/tree/chargeAction";

type Props = {
  tree: Tree;
};

export default function ChargeButton({ tree }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // コトダマのチャージ可否判定
  const canCharge = (() =>  {
    if(!tree.last_charged_at) {
      return true; // last_charged_atがnullの場合はチャージ可能
    }
    const timeDiff = new Date().getTime() - new Date(tree.last_charged_at).getTime();
    return timeDiff >= CHARGE_INTERVAL; // 定数で管理
  })();

  // モーダルの開閉制御
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Modal展開ボタンをクリックした時の処理
  const openModal = async () => {
    setIsModalOpen(true);
  };

  const handleClickCharge = async () => {
    await chargeAction(tree.id);
    window.location.reload();
  };
  return (
    <>
      {canCharge ? (
        <button onClick={() => openModal()}>
          <Image src="/charge.svg" alt="charge_icon" width={64} height={64} />
        </button>
      ) : (
        <button disabled>
          <Image
            src="/charge_disabled.svg"
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
