// import { auth } from "@/auth";
import EmptyHeartButton from "@/components/ui/EmptyHeartButton";
import FilledHeartButton from "@/components/ui/FilledHeartButton";
import createFavoriteAction from "@/lib/actions/favorite/createFavoriteAction";
import destroyFavoriteAction from "@/lib/actions/favorite/destroyFavoriteAction";
import { Soul } from "@/types/soul";
import { useState } from "react";

type Props = {
  soul: Soul;
};
export default function HeartButtonToggle({ soul }: Props) {
  const userIds: string[] = soul.favorites.map((fav) => fav.user_id);
  // const session = await auth();
  // const user_id = session.userId;
  const user_id = "20e38594-c420-424c-9e1a-456599049e09";
  const isFavorite = userIds.some((id) => id === user_id);

  const [favorite, setFavorite] = useState(isFavorite);

  const toggleFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (favorite) {
      await destroyFavoriteAction(soul.id);
    } else {
      await createFavoriteAction(soul.id);
    }
    setFavorite(!favorite);
  };
  return (
    <button onClick={toggleFavorite}>
      {favorite ? <FilledHeartButton/> : <EmptyHeartButton />}
    </button>
    
  );
}
