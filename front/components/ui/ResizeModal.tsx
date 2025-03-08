'use client'

/**
 * 共通のモーダルコンポーネント。コンテンツに合わせてリサイズするモーダルを表示する。
 * 主に確認ダイアログなど、コンテンツが少ない場合に使用する想定。
 * 
 * @param isOpen - 親コンポーネントから渡される表示状態（State)
 * @param children - モーダル内部のコンテンツ
 */

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export default function ResizeModal({ isOpen, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    // モーダルの背景 > レスポンシブ対応のコンテナ > モーダルデザイン > childrenの順に配置
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      {/* 横幅はmdで固定。高さの最大も固定し，要素がはみ出る場合は縦スクロール */}
      <div className="flex container mx-auto max-w-md justify-center items-center">
        <div className="bg-gray-900 border-white border-2 rounded-lg w-[90%] max-h-80 overflow-y-auto">
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}