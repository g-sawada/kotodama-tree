import { auth } from "@/auth";

import DropdownMenu from "./DropdownMenu";

export default async function Header () {
  const session = await auth();
  const userId = session?.user?.userId ?? null;

  return (
    <nav className="flex justify-between w-full border-b px-6">
      <div className="flex items-center justify-start h-16 gap-4">
        <p className="text-2xl font-bold">コトダマノキ</p>
      </div>
      <div className="flex items-center justify-center h-16 gap-4">
        <DropdownMenu userId={userId}/>
      </div>
    </nav>
  )
}
