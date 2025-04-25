'use client';

import createUserAction from "@/lib/actions/user/createUserAction";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useFlash } from "@/components/layout/FlashMessage";

const MAX_LENGTH = 20


export default function SignupForm() {
  // バリデーションエラーをフラッシュメッセージで表示
  const { setFlash } = useFlash();
  const session = useSession();
  const [name, setName] = useState<string>(session.data?.user.name || '');
  // 登録ボタンをタップした際にメッセージが表示されるようuseStateを使用
  const [isValid, setIsValid] = useState<boolean>(true);

  // バリデーションエラーがあれば、isValidをfalseに登録ボタンがタップできないようにする
  useEffect(() => {
    if (name.length === 0) {
      setFlash({ type: "warning", message: "ユーザー名を入力してください"});
      setIsValid(false);
    } else if (name.length > MAX_LENGTH) {
      setFlash({ type: "warning", message: `ユーザー名は${MAX_LENGTH}文字以内で入力してください`});
      setIsValid(false);
    } else {
      setFlash(null);
      setIsValid(true);
    }
  }, [name, setFlash]);

  return (
    <form action={createUserAction}>
      <div className="flex flex-col items-center">
        <label htmlFor="name" className="block font-bold mb-6">
          ユーザー名をきめてください
        </label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded p-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        />

        {/* provider を hidden フィールドで渡す */}
        <input type="hidden" name="provider" value={session.data?.user.provider || ''} />
        <input type="hidden" name="provider_id" value={session.data?.user.provider_id || ''} />

        <button
          type="submit"
          className={`my-10 px-4 py-2 font-bold border-2 rounded transition 
            ${!isValid ? "opacity-50 bg-cyan-500 cursor-not-allowed" : "bg-cyan-500 hover:bg-cyan-400 cursor-pointer"}`}
          disabled={!isValid}
        >
          登録する
        </button>
      </div>
    </form>
  )
}
