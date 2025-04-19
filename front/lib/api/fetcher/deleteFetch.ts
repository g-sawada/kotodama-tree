import { FetchResult } from "@/types/fetchResult";

export const deleteFetch = async <T> (
  url: string,
  reqBody: object,
): Promise<FetchResult<T>> => {
  const baseUrl = `${process.env.API_URL}/api/${process.env.API_VERSION}`;

  try {
    const res = await fetch(baseUrl + url,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "aplication/json",
        },
        body: JSON.stringify(reqBody),
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
