import { FetchResult } from "@/types/fetchResult";

interface Maintenance {
  isMaintenance: boolean;
  nextResetStartAt: string | null
}

export const getMaintenance = async (): Promise<FetchResult<Maintenance>> => {
  const url = `${process.env.API_URL}/api/${process.env.API_VERSION}/system/maintenance`;

  try {
    const res = await fetch(url, 
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