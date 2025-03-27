/**
 * コトダマを新規作成するAPIを呼び出す
 * @param content コトダマ本文
 * @param creator_id コトダマ作成者のuser_id
 * @returns FetchResult<Soul>
 */

import { FetchResult } from "@/types/fetchResult";
import { Soul } from "@/types/soul";

export const createSoul = async (
  content: string,
  creator_id: string
): Promise<FetchResult<Soul>> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/souls`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          soul: {
            content: content,
            creator_id: creator_id,
          },
        }),
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
