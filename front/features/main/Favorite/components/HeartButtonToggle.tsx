"use client";

import EmptyHeartButton from "@/components/ui/EmptyHeartButton";
import FilledHeartButton from "@/components/ui/FilledHeartButton";
import createFavoriteAction from "@/lib/actions/favorite/createFavoriteAction";
import destroyFavoriteAction from "@/lib/actions/favorite/destroyFavoriteAction";
import { Soul } from "@/types/soul";
import { useSession } from "next-auth/react";
import { useState } from "react";

type Props = {
  soul: Soul;
};
export default function HeartButtonToggle({ soul }: Props) {
  const userIds: string[] = soul.favorites.map((fav) => fav.user_id);
  const session = useSession();
  const user_id = session?.data?.user.userId;
  const isFavorite = userIds.some((id) => id === user_id);

  const [favorite, setFavorite] = useState(isFavorite);

  const toggleFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const result = favorite
      ? await destroyFavoriteAction(soul.id)
      : await createFavoriteAction(soul.id);
    if (result.isOk) {
      setFavorite(!favorite);
    }
  };
  return (
    <button onClick={toggleFavorite}>
      {favorite ? <FilledHeartButton /> : <EmptyHeartButton />}
    </button>
  );
}
