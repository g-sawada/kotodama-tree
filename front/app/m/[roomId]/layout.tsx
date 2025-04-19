import EnterAuth from "@/features/main/EnterAuth/EnterAuth";

/**
 * メイン画面（/m/:roomId) の共通レイアウトコンポーネント
 * EnterAuthコンポーネントでpage.tsxのchildrenをラップし，入室認証を行う
 * @prop { children: React.ReactNode }
 * @prop { params: { roomId: string } }
 */

type Props = {
  children: React.ReactNode;
  params: Promise<{
    roomId: string;
  }>;
};

export default async function MainLayout({ children, params }
  : Props) {
  const { roomId } = await params;
  
  return (
    <>
      <EnterAuth thisRoomId={roomId}>
        {children}
      </EnterAuth>
    </>
  )
}
