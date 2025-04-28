'use client';

import createUserAction from "@/lib/actions/user/createUserAction";
import { useSession } from "next-auth/react";
import { useEffect, useState, useRef } from "react";

import ResizeModal from "@/components/ui/ResizeModal";
import Button from "@/components/ui/Button";

export default function SignupForm() {
  const session = useSession();
  const [name, setName] = useState<string>(session.data?.user.name || '');
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeletable, setIsDeletable] = useState(false);

  useEffect(() => {
    if (name) {
      setName(name);
    }
  }, [name])

  // フォームのバリデーション表示表示
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    if (value.length === 0) {
      setIsDeletable(true);
      setError("名前を1文字以上入力して下さい");
    } else if (value.length > 10) {
      setError("名前は10文字以内で入力してください");
      setIsDeletable(true);
    } else {
      setError("");
      setIsDeletable(false);
    }
  }

  // 登録確認モーダルの開閉
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
    closeModal();
  }

  return (
    <form action={createUserAction} ref={formRef}>
      <div className="min-h-10">
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <div className="flex flex-col items-center">
        <label htmlFor="name" className="block font-bold mb-6">
          ユーザー名をきめてください
        </label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
          className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded p-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        />

        {/* provider を hidden フィールドで渡す */}
        <input type="hidden" name="provider" value={session.data?.user.provider || ''} />
        <input type="hidden" name="provider_id" value={session.data?.user.provider_id || ''} />

        <button
          type="button"
          onClick={openModal}
          disabled={isDeletable}
          className={`my-10 px-4 py-2 font-bold border-2 border-white rounded transition bg-cyan-500 hover:bg-cyan-400 cursor-pointer
                    ${isDeletable ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          登録する
        </button>
        <ResizeModal isOpen={isModalOpen}>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4 text-white text-center">{name}</h2>
            <p className="text-lg mb-6 text-white text-center">この名前で登録しますか？</p>
            <div className="flex justify-center gap-4 mt-4">
              <Button
                text="はい"
                handleClick={handleSubmit}
                buttonType="ok"
              />
              <Button
                text="いいえ"
                handleClick={closeModal}
                buttonType="cancel"
              />
            </div>
          </div>
        </ResizeModal>
      </div>
    </form>
  )
}
