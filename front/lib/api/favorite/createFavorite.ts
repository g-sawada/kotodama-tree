/**
 * soulに「いいね」するAPIを呼び出す
 * @param soul_id 「いいね」する対象となるコトダマのsoul_id
 * @param user_id ログイン中ユーザーのuser_id
 * @returns Promise<Favorite>
 */

import { Favorite } from "@/types/favorite";
import { postFetch } from "../fetcher/postFetch";

export const createFavorite = async (
  soul_id: number,
  user_id: string
): Promise<Favorite> => {
  // APIをコール
  const result = await postFetch<Favorite>(`/souls/${soul_id}/favorites`, {
    user_id: user_id,
  });

  if (!result.isOk) {
    throw new Error(`createFavoriteAction: データの取得に失敗しました`);
  }

  const favorite = result.body.data;
  return favorite;
};
