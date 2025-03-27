'use client';

import createUserAction from "@/lib/actions/user/createUserAction";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SignupForm() {
  const session = useSession();
  const [name, setName] = useState<string>(session.data?.user.name || '');

  useEffect(() => {
    if (name) {
      setName(name);
    }
  }, [name])

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
          className="my-10 px-4 py-2 font-bold border-2 border-white rounded transition bg-cyan-500 hover:bg-cyan-400 cursor-pointer"
        >
          登録する
        </button>
      </div>
    </form>
  )
}