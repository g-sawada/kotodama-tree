import SignInButton from "@/components/ui/authButton/SignInButton";

export default function LoginPage() {
  return (
    <> 
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-xl pt-6">ログインページ</h1>
        <p className="my-4">ログインに利用するサービスを選んで下さい</p>
        <div className="py-10">
          <div className="flex flex-col mx-auto justify-center items-center gap-4">
            <SignInButton provider="github"/>
            <SignInButton provider="google"/>
            <SignInButton provider="twitter"/>
          </div>
        </div>
        <div className="container mx-auto text-center px-6 mt-10">
          <p className="text-sm text-gray-500">※本サービス独自のメールアドレス・パスワードによる認証はございません</p>
        </div>
      </div>
    </>
  )
}
