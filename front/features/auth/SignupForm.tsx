'use client';

import createUserAction from "@/lib/actions/user/createUserAction";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const MAX_LENGTH = 20

export default function SignupForm() {
  const session = useSession();
  const [name, setName] = useState<string>(session.data?.user.name || '');
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (name.length === 0) {
      setError('ユーザー名を入力してください');
    } else if (name.length > MAX_LENGTH) {
      setError(`ユーザー名は${MAX_LENGTH}文字以内で入力してください`);
    } else {
      setError(null);
    }
  }, [name]);

  const isDisabled = !!error;

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
        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}

        {/* provider を hidden フィールドで渡す */}
        <input type="hidden" name="provider" value={session.data?.user.provider || ''} />
        <input type="hidden" name="provider_id" value={session.data?.user.provider_id || ''} />

        <button
          type="submit"
          className="my-10 px-4 py-2 font-bold border-2 border-white rounded transition bg-cyan-500 hover:bg-cyan-400 cursor-pointer"
          disabled={isDisabled}
        >
          登録する
        </button>
      </div>
    </form>
  )
}
