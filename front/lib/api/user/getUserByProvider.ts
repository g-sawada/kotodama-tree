/**
 * providerとprovider_idからユーザー情報を取得する
 */

import { FetchResult } from "@/types/fetchResult";
import { getFetch } from "../fetcher/getFetch";

interface UserId {
  id: string;
}

export const getUserByProvider = async (
  provider: string,
  provider_id: string
): Promise<FetchResult<UserId>> => {
  const result = await getFetch<UserId>(
    `/users/find_by_provider?provider=${provider}&provider_id=${provider_id}`
  );

  return result;
};