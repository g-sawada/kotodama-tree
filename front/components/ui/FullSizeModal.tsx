'use client'

/**
 * 共通のモーダルコンポーネント。画面全体を覆うフルサイズのモーダルを表示する。
 * 
 * @param isOpen - 親コンポーネントから渡される表示状態（State)
 * @param children - モーダル内部のコンテンツ
 */

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export default function FullSizeModal({ isOpen, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    // モーダルの背景 > レスポンシブ対応のコンテナ > モーダルデザイン > childrenの順に配置
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="flex container mx-auto h-full justify-center items-center">
        <div className="bg-gray-900 border-white border-2 rounded-lg w-[90%] h-[90%] overflow-y-auto">
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}