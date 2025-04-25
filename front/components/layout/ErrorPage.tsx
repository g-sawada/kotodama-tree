import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-4">
      <h1>エラーが発生しました</h1>
      <p>ページを再読み込みして下さい</p>
      <p>それでも解決しない場合は、トップページからログインしなおして下さい</p>
      <Link href="/" className="text-blue-500 hover:underline">
        トップページへ
      </Link>
    </div>
  )
}
