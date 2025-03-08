'use client'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import ResizeModal from '@/components/ui/ResizeModal'


/**
 * デモ用のモーダルコントローラー
 * 
 * @note
 * クライアントコンポーネントを作成する必要があるため，デモ的に作成
 * 不要になった時点で撤去する
 * 
 */

export default function DemoResizeModalController() {

  const [isModalOpen, setIsModalOpen] = useState(false)

  // モーダルの開閉制御
  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  // Modal展開ボタンをクリックした時の処理
  const handleClickModalButton = () => {
    openModal()
  }

  // 閉じるボタンをクリックした時の処理
  const handleClickCloseButton = () => {
    closeModal()
  }

  return (
    <>
      <button onClick={handleClickModalButton} className='text-sm'> 確認デモ </button>
      <div>
        <ResizeModal isOpen={isModalOpen}>
          <div className='flex flex-col justify-center gap-4 mt-6'>
            <h1 className='text-center text-xl font-bold'>確認画面デモ</h1>
            <p className='text-center text-lg'>
              よろしいですか？
            </p>
            <div className='flex justify-center my-4 gap-6'>
              <Button text="Cacel" buttonType="cancel" handleClick={handleClickCloseButton} />
              <Button text="OK" buttonType="ok" handleClick={handleClickCloseButton} />
            </div>
          </div>
        </ ResizeModal>
      </div>
    </>
  )
}
