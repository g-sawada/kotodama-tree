/**
 * user_data
 * user,tree,soulの情報を取得する
 */

import { FetchResult } from "@/types/fetchResult";
import { User } from "@/types/user";
import { TreeWithProgress } from "@/types/tree";
import { Soul } from "@/types/soul";
import { getFetch } from "../fetcher/getFetch";

interface UserProfileResponse {
  user: User;
  tree: TreeWithProgress;
  souls: Soul[];
};

export const userProfile = async (
  userId: string,
): Promise<FetchResult<UserProfileResponse>> => {
  const url = `/users/${userId}/profile`;
  return await getFetch<UserProfileResponse>(url);
};
