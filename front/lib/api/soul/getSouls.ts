import { getFetch } from "@/lib/api/fetcher/getFetch";
import { FetchResult } from "@/types/fetchResult";
import { Soul } from "@/types/soul";

/**
 * コトダマ取得 API souls#indexをコールする
 * @param owner_id コトダマの所有者のuser_id
 * @param creator_id コトダマの作成者のuser_id
 * @param captured_tree_id コトダマが捧げられているtreeのid
 * @returns Promise<FetchResult<Soul[]>>
 */

interface getSoulsParams {
  owner_id?: string;
  creator_id?: string;
  captured_tree_id?: number;
}

export const getSouls = async ({ owner_id, creator_id, captured_tree_id }: getSoulsParams) : Promise<FetchResult<Soul[]>>=> {

  // 引数からURLパラメータを生成
  const params = new URLSearchParams();
  if (owner_id) params.append('owner_id', owner_id);
  if (creator_id) params.append('creator_id', creator_id);
  if (captured_tree_id) params.append('captured_tree_id', captured_tree_id.toString());

  /**
   * コトダマ取得 API souls#index を実行
   * @params owner_id? コトダマの所有者のuser_id
   * @params creator_id? コトダマの作成者のuser_id
   * @params captured_tree_id? コトダマが捧げられているtreeのid
   * paramsは最低1種類の指定が必要
   * 
   * 正常系
   * - 検索条件に一致するコトダマ一覧データ（favoritesデータを含む）を返す (200 OK)
   *   @returns data.souls :Soul[]
   * 異常系
   * - パラメータが1つも指定されていない (400 Bad Request)
   * - その他のエラー(500 Internal Server Error)
   */

  const result = await getFetch<Soul[]>(
    `/souls?${params.toString()}`
  );

  return result;
}
