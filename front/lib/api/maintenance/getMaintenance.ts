import { FetchResult } from "@/types/fetchResult";

interface Maintenance {
  isMaintenance: boolean;
  nextResetStartAt: string | null;
}

// キャッシュ期間
const CACHE_REVALIDATE_SECONDS = 1 * 60;
// キャッシュタグ
export const MAINTENANCE_CACHE_TAG = 'maintenance';

export const getMaintenance = async (): Promise<FetchResult<Maintenance>> => {
  const url = `${process.env.API_URL}/api/${process.env.API_VERSION}/system/maintenance`;

  try {
    const res = await fetch(url, 
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // Data Cache: 指定した時間キャッシュし、タグを付ける
        next: {
          revalidate: CACHE_REVALIDATE_SECONDS,
          tags: [MAINTENANCE_CACHE_TAG],
        },
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