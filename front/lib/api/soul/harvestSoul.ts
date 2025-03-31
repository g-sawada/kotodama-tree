/**
 * コトダマをしゅうかくするAPIを呼び出す
 * @param soul_id しゅうかく対象のコトダマid
 * @param user_id しゅうかくを実行するユーザーのid
 * @param room_id しゅうかくが実行される部屋のid
 * @returns FetchResult<Soul>
 */

import { FetchResult } from "@/types/fetchResult";
import { Soul } from "@/types/soul";

export const harvestSoul = async (
  soul_id: number,
  user_id: string,
  room_id: string
): Promise<FetchResult<Soul>> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/souls/${soul_id}/harvest`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user_id, room_id: room_id }),
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
