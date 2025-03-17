'use client'

import { useState } from 'react'
import Image from "next/image";
import Button from '@/components/ui/Button'
import ResizeModal from '@/components/ui/ResizeModal'

export default function HomePortalButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // モーダルの開閉制御
  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }
  const handleClickMakePortal = () => {
    try {
      console.log("自分の部屋へのポータル作成＆自分の部屋へのリダイレクト処理")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button onClick={() => openModal()} className="text-sm">
        <Image src="portal.svg" alt="portal_icon" width={64} height={64} />
      </button>
      <div>
        <ResizeModal isOpen={isModalOpen}>
          <div className="flex flex-col justify-center gap-4 mt-6">
            <p className="text-center text-lg">自分の部屋へのポータルを開きます。<br/>よろしいですか？</p>
            <div className="flex justify-center my-4 gap-6">
              <Button
                text="Cancel"
                buttonType="cancel"
                handleClick={() => closeModal()}
              />
              <Button
                text="OK"
                buttonType="ok"
                // 自分の部屋に通じるポータル作成処理
                handleClick={handleClickMakePortal}
              />
            </div>
          </div>
        </ResizeModal>
      </div>
    </>
  );
}
