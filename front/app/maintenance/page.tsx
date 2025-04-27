import Link from "next/link"

export default function MaintenancePage() {
  return (
    <div className="flex flex-col items-center mt-10 w-full h-screen gap-4">
      <h1 className="text-4xl">メンテンス中...</h1>
      <p>ただいまメンテナンス中です</p>
      <Link href="/" className="text-blue-500 hover:underline">
        トップページへ
      </Link>
    </div>
  )
}
