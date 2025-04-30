import { auth } from "@/auth";
import EnterOfferAuth from "@/features/offer/EnterOfferAuth/EnterOfferAuth";

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

export default async function OfferLayout({ children, params }
  : Props) {
  const { roomId } = await params;
  const session = await auth();
  const userId = session?.user?.userId;
  // NOTE: EnterOfferAuth内でsessionを取得すると，初回アクセス時にuserIdがundefinedになるため，
  // ここで取得してpropsとして渡すようにする。
  // TODO: undefinedの場合のハンドリング未実装

  return (
    <>
      <EnterOfferAuth thisRoomId={roomId} userId={userId}>
        {children}
      </EnterOfferAuth>
    </>
  )
}
