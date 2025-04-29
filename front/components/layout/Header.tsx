import { auth } from "@/auth";

import DropdownMenu from "./DropdownMenu";
import AuthInfo from "./AuthInfo";

export default async function Header () {
  const session = await auth();
  const userId = session?.user?.userId ?? null;

  return (
    <nav className="flex justify-between w-full border-b px-6">
      <div className="flex items-center justify-start h-16 gap-4">
        <p className="text-xl font-bold">コトダマプロジェクト</p>
      </div>
      <div className="flex items-center justify-center h-16 gap-4">
        <AuthInfo />
        <DropdownMenu userId={userId}/>
      </div>
    </nav>
  )
}
