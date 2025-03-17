import { auth } from "@/auth"
import SignupForm from "@/features/auth/SignupForm";

export default async function SignupPage() {
  const session = await auth();
  return (
    <>
      <div className="flex flex-col items-center h-screen">
        <h1 className="text-4xl font-bold my-10">新規登録ページ</h1>

          <SignupForm />

          <div className='my-10 text-gray-400'>
            <h2 className="my-4">デバッグ用: セッション情報</h2>
            <pre>{JSON.stringify(session, null, 2)}</pre>
          </div>

      </div>
    </>
  )
}