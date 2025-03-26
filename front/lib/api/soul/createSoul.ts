/**
 * コトダマを新規作成するAPIを呼び出す
 * @param content コトダマ本文
 * @param owner_id コトダマ所持者のuser_id
 * @param creator_id コトダマ作成者のuser_id
 * @param home_tree_id コトダマ作成者のキのtree_id
 * @param captured_tree_id コトダマが捧げられているキのtree_id
 * @returns FetchResult<Soul>
 */

import { FetchResult } from "@/types/fetchResult";
import { Soul } from "@/types/soul";

export const createSoul = async (
  content: string,
  owner_id: string,
  creator_id: string,
  home_tree_id: string,
  captured_tree_id: string
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
            owner_id: owner_id,
            creator_id: creator_id,
            home_tree_id: home_tree_id,
            captured_tree_id: captured_tree_id,
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
