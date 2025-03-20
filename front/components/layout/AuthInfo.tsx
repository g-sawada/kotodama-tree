'use client';
import { useState } from "react";
import ResizeModal from "../ui/ResizeModal";
import Button from "../ui/Button";
import { useSession } from "next-auth/react";

/**
 * デバッグ用のセッション情報表示モーダル
 * 不要になったら削除してください
 */


export default function AuthInfo() {
  const session = useSession();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button className="text-sm" onClick={() => setIsOpen(true)}>DEBUG: session</button>

      <div>
        <ResizeModal isOpen={isOpen}>
          <div className="flex flex-col justify-center items-center p-2">
            <Button text="Close" buttonType="cancel" handleClick={() => setIsOpen(false)}/>
            <pre className="max-w-full text-sm">{JSON.stringify(session, null, 2)}</pre>
          </div>
        </ResizeModal>
      </div>
    </>
  )
}
