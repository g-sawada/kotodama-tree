import { FetchResult } from "@/types/fetchResult";
import { Soul } from "@/types/soul";

/**
 * API souls#indexをコールするfetch関数
 * @param owner_id コトダマの所有者のuser_id
 * @param creator_id コトダマの作成者のuser_id
 * @param captured_tree_id コトダマが捧げられているtreeのid
 * @returns FetchResult<Soul[]> | FetchResult<Error>
 */

interface getSoulsParams {
  owner_id?: string;
  creator_id?: string;
  captured_tree_id?: string;
}

export const getSouls = async ({ owner_id, creator_id, captured_tree_id }: getSoulsParams) : Promise<FetchResult<Soul[]>>=> {

  // 引数からURLパラメータを生成
  const params = new URLSearchParams();
  if (owner_id) params.append('owner_id', owner_id);
  if (creator_id) params.append('creator_id', creator_id);
  if (captured_tree_id) params.append('captured_tree_id', captured_tree_id);

  // URLパラメータが全て空の場合はエラーを投げる
  if(!params.toString()) {
    throw new Error('getSouls: 最低1つのパラメータを指定してください');
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/souls?${params.toString()}`;
  
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


// -----------  以下，mock画面開発用 不要になった時点で削除する ----------


export const getSoulsByOwnerId = async (owner_id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/souls?owner_id=${owner_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
  });
  return res.json();
}

export const getSoulsByCreatorId = async (creator_id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/souls?creator_id=${creator_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
  });
  return res.json();
}

export const getSoulsByCapturedTreeId = async (captured_tree_id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/souls?captured_tree_id=${captured_tree_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
  });
  return res.json();
}