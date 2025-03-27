import { signOut } from "@/auth";

export default function SignOutButton() {
  return (
    <form
      action={ async () =>  {
        'use server';
        await signOut({ redirectTo: '/login' });
      }}
    >
      <button className="text-sm">
        ログアウト
      </button>
    </form>
  )
}
