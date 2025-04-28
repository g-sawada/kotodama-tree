"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import EmptyHeartButton from "@/components/ui/EmptyHeartButton";
import FilledHeartButton from "@/components/ui/FilledHeartButton";
import createFavoriteAction from "@/lib/actions/favorite/createFavoriteAction";
import destroyFavoriteAction from "@/lib/actions/favorite/destroyFavoriteAction";
import { Soul } from "@/types/soul";
import { useFlash } from "@/components/layout/FlashMessage";

type Props = {
  soul: Soul;
};
export default function HeartButtonToggle({ soul }: Props) {
  const userIds: string[] = soul.favorites.map((fav) => fav.user_id);
  const session = useSession();
  const user_id = session?.data?.user.userId;
  const isFavorite = userIds.some((id) => id === user_id);
  const { setFlash } = useFlash();

  const [favorite, setFavorite] = useState(isFavorite);

  const toggleFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!favorite) {
      // お気に入りされていない場合，お気に入り登録アクションを実行
      createFavoriteAction(soul.id).then((result) => {
        if(!result.isOk && result.status === 404) {
          // 404エラーの場合，コトダマが存在しないためエラーメッセージを表示
          setFlash({ type: "error", message: "お気に入り登録に失敗しました。" });
        } else {
          // お気に入り登録成功時 または 409エラー（お気に入り済み）時はstateを更新
          setFavorite(true);
        }
      })
    } else {
      // お気に入りされている場合，お気に入り解除アクションを実行
      destroyFavoriteAction(soul.id).then((result) => {
        if(!result.isOk && result.status === 404) {
            // 404エラーの場合，コトダマが存在しないためエラーメッセージを表示
          setFlash({ type: "error", message: "お気に入り解除に失敗しました。" });
        } else {
          // お気に入り解除成功時 または 409エラー（お気に入り解除済み）時はstateを更新
          setFavorite(false);
        }
      })
    }
  };
  
  return (
    <button onClick={toggleFavorite}>
      {favorite ? <FilledHeartButton /> : <EmptyHeartButton />}
    </button>
  );
}
