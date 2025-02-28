'use client'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import FullSizeModal from '@/components/ui/FullSizeModal'


/**
 * デモ用のモーダルコントローラー
 * 
 * @note
 * クライアントコンポーネントを作成する必要があるため，デモ的に作成
 * 不要になった時点で撤去する
 * 
 */

export default function DemoModalController() {

  const [isModalOpen, setIsModalOpen] = useState(false)

  // モーダルの開閉制御
  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  // Modalボタンをクリックした時の処理
  const handleClickModalButton = () => {
    openModal()
  }

  // 閉じるボタンをクリックした時の処理
  const handleClickCloseButton = () => {
    closeModal()
  }

  return (
    <>
      <Button text='Open Modal' handleClick={handleClickModalButton} />

      <div>
        <FullSizeModal isOpen={isModalOpen}>
          <div className='flex flex-col justify-center gap-10 mt-10'>
            <h1 className='text-center text-xl font-bold'>This is Modal</h1>
            <p className='text-center text-lg'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <div className='flex justify-center my-4'>
              <Button text="Close" buttonType="cancel" handleClick={handleClickCloseButton} />
            </div>
          </div>
        </ FullSizeModal>
      </div>
    </>
  )
}
