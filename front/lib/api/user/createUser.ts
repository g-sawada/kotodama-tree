/**
 * ユーザーを新規作成するAPIを呼び出す
 * @param name ユーザー名
 * @param provider プロバイダー名
 * @param provider_id プロバイダーID
 * @returns FetchResult<User>
 */

import { FetchResult } from "@/types/fetchResult";
import { User } from "@/types/user";

export const createUser = async (
  name: string,
  provider: string,
  provider_id: string
): Promise<FetchResult<User>> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/users`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, provider: provider, provider_id: provider_id }),
        cache: 'no-cache',
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