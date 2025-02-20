export default async function Header () {
  return (
    <nav className="flex justify-between w-full border-b px-6">
      <div className="flex items-center justify-start h-16 gap-4">
        <p className="text-xl font-bold">コトダマプロジェクト</p>
      </div>
      <div className="flex items-center justify-center h-16 gap-4">
        <a href="/login" className="text-sm">遊び方</a>
        <a href="/register" className="text-sm">ログアウト</a>
      </div>
    </nav>
  )
}