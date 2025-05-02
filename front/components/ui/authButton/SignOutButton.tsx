import { SignOutAction } from "@/lib/actions/auth/SignOutAction";

export default function SignOutButton() {
  return (
    <form action={SignOutAction}>
      <button type="submit">
        ログアウト
      </button>
    </form>
  )
}
