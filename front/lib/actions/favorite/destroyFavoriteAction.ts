"use server"

// import { Favorite } from "@/types/favorite";

/**
 * コトダマカードのいいね済みボタンから起動し，API favorites#destroyをコールする。
 * @param soul_id - いいね解除する対象のsoul_id
 */

export default async function destroyFavoriteAction(soul_id: number) {
  // セッションからuser_idを取得
  // const session = await auth();
  // const user_id = session.userId;
  const user_id = "20e38594-c420-424c-9e1a-456599049e09"

  // リクエストボディを作成
  // const reqBody = {
  //   user_id: user_id
  // }

  // APIをコール
  // const result = await postFetch<Favorite>(
  //   `/favorites/${favorite_id}`,
  //   reqBody
  // )

  // if (!result.isOk) {
  //   console.error("いいね解除実行時にエラーが発生しました");
  // }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/souls/${soul_id}/favorites`,
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

}