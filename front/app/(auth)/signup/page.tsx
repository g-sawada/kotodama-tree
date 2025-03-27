import { auth, signOut } from "@/auth"
import SignupForm from "@/features/auth/SignupForm";

export default async function SignupPage() {
  const session = await auth();
  return (
    <>
      <div className="flex flex-col items-center h-screen">
        <h1 className="text-4xl font-bold my-10">新規登録ページ</h1>
        <SignupForm />

        <div>認証サービス: {session?.user.provider}</div>

        <div className="my-4">
          <form
            action={ async () =>  {
              'use server';
              await signOut({ redirectTo: '/login' });
            }}
          >
            <button>
              別のサービスでログインする
            </button>
          </form>
        </div>
      </div>
    </>
  )
}