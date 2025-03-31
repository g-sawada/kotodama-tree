/**
 * userIdからユーザー情報を取得する
 */

import { FetchResult } from "@/types/fetchResult";
import { User } from "@/types/user";


export const getUser = async (
  userId: string,
): Promise<FetchResult<User>> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/users/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
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