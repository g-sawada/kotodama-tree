/**
 * 自分のホームへのポータルを作成するAPIを呼び出す
 * @param room_1_id 現在訪れている部屋のroom_id
 * @param room_2_id ユーザーのホームの部屋のroom_id
 * @returns FetchResult<Pathway>
 */

import { FetchResult } from "@/types/fetchResult";
import { Pathway } from "@/types/pathway";

export const createPathway = async (
  room_1_id: string,
  room_2_id: string
): Promise<FetchResult<Pathway>> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/pathways`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          room_1_id: room_1_id,
          room_2_id: room_2_id,
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
