import { signOut } from "@/auth";

export default function SignOutButton() {
  return (
    <form
      action={ async () =>  {
        'use server';
        await signOut();
      }}
    >
      <button className="text-sm">
        ログアウト
      </button>
    </form>
  )
}
