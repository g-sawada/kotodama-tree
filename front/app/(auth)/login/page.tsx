import SignInButton from "@/components/ui/authButton/SignInButton";

export default function LoginPage() {
  return (
    <> 
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-xl pt-6">Login Page</h1>
        <div className="py-10">
          <div className="flex flex-col mx-auto justify-center items-center gap-4">
            <SignInButton provider="github"/>
            <SignInButton provider="google"/>
            <SignInButton provider="twitter"/>
          </div>
        </div>
      </div>
    </>
  )
}
