import EnterAuth from "@/features/main/EnterAuth/EnterAuth";

export default async function MainLayout({ children, params }
  : { children: React.ReactNode, params: { roomId: string };
}) {
  const { roomId: thisRoomId } = await params;

  return (
    <div>
      メインレイアウト {thisRoomId}
      <EnterAuth thisRoomId={thisRoomId}>
        {children}
      </EnterAuth>
    </div>
  )
}
