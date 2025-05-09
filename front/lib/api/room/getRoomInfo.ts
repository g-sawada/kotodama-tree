/**
 * room情報を取得するAPIを呼び出す
 * @param name ユーザー名
 * @param provider プロバイダー名
 * @param provider_id プロバイダーID
 * @returns FetchResult<User>
 */

import { FetchResult } from "@/types/fetchResult";
import { RoomInfo } from "@/types/room";

export const getRoomInfo = async (
  roomId: string,
): Promise<FetchResult<RoomInfo>> => {
  try {
    const res = await fetch(
      `${process.env.API_URL}/api/${process.env.API_VERSION}/rooms/${roomId}`,
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

