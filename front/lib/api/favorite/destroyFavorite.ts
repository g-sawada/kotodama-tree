/**
 * soulの「いいね」を解除するAPIを呼び出す
 * @param favorite_id 削除する対象となるfavorite_id
 * @param user_id ログイン中ユーザーのuser_id
 * @returns FetchResult<Favorite>
 */


import { Favorite } from "@/types/favorite";
import { FetchResult } from "@/types/fetchResult";

export const destroyFavorite = async (
  favorite_id: number,
  user_id: string
): Promise<FetchResult<Favorite>> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/favorites/${favorite_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user_id }),
        cache: "no-cache",
      }
    );
    const body = await res.json();

    if (!res.ok) {
      // エラーレスポンスが返ってきた場合
      return {
        status: res.status,
        isOk: false,
        body: { error: body.error },
      };
    } else {
      // 正常系レスポンスが返ってきた場合
      return {
        status: res.status,
        isOk: true,
        body: { data: body.data, message: body.message },
      };
    }
  } catch {
    // ネットワークエラー等でresやjsonパースに異常が発生した場合
    return {
      status: 500,
      isOk: false,
      body: { error: "サーバー通信エラー" },
    };
  }
};

