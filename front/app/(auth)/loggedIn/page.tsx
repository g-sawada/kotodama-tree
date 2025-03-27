import { auth } from '@/auth'
import React from 'react'

export default async function page() {
  const session = await auth();
  return (
    <div>
      <div className="text-4xl text-center">ログイン後リダイレクトページ（仮）</div>
      <div className="flex max-w-32 mx-auto justify-center items-center h-40 gap-4">
      </div>
      <div className="my-4">
        <p className="flex justify-center font-bold">current_user session</p>
        <pre className="flex justify-center text-sm">{JSON.stringify(session, null, 2)}</pre>
      </div>
    </div>
  )
}
