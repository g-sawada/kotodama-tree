/**
 * 入室可否判定APIを呼び出す
 * @param userId ユーザー名
 * @param roomId 部屋ID
 * @returns FetchResult<User>
 */

import { FetchResult } from "@/types/fetchResult";

interface EnterAuthResponse {
  canEnter: boolean;
}

export const enterAuth = async (
  userId: string,
  roomId: string,
): Promise<FetchResult<EnterAuthResponse>> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/rooms/${roomId}/enter`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId }),
        cache: "no-cache",
      }
    );
    const body = await res.json();

    if (!res.ok) {
      // エラーレスポンスが返ってきた場合
      return {
        status: res.status,
        isOk: false,
        body: { error: body.error }
      };

    } else {
      // 正常系レスポンスが返ってきた場合
      return {
        status: res.status,
        isOk: true,
        body: { data: body.data, message: body.message }
      };
    }

  } catch {
    // ネットワークエラー等でresやjsonパースに異常が発生した場合
    return {
      status: 500,
      isOk: false,
      body: { error: "サーバー通信エラー" }
    };
  }
};

