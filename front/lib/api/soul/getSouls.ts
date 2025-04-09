import { getFetch } from "@/lib/api/fetcher/getFetch";
import { Soul } from "@/types/soul";

/**
 * API souls#indexをコールする
 * @param owner_id コトダマの所有者のuser_id
 * @param creator_id コトダマの作成者のuser_id
 * @param captured_tree_id コトダマが捧げられているtreeのid
 * @returns Promise<Soul[]>
 */

interface getSoulsParams {
  owner_id?: string;
  creator_id?: string;
  captured_tree_id?: number;
}

export const getSouls = async ({ owner_id, creator_id, captured_tree_id }: getSoulsParams) : Promise<Soul[]>=> {

  // 引数からURLパラメータを生成
  const params = new URLSearchParams();
  if (owner_id) params.append('owner_id', owner_id);
  if (creator_id) params.append('creator_id', creator_id);
  if (captured_tree_id) params.append('captured_tree_id', captured_tree_id.toString());

  // URLパラメータが全て空の場合はエラーを投げる
  if(!params.toString()) {
    throw new Error('getSouls: 最低1つのパラメータを指定してください');
  }

  // APIをコール
  const result = await getFetch<Soul[]>(
    `/souls?${params.toString()}`
  );
  
  // NOTE: コトダマ取得APIが失敗した場合の処理は議論の必要あり
  // 1. エラーページやトップページにリダイレクトするのか
  // 2. クライアント側までエラーを返し，フラッシュメッセージを表示させるのか
  if (!result.isOk) {
    throw new Error(`getSoulsAction: データの取得に失敗しました`);
  }

  const souls = result.body.data;
  return souls;
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