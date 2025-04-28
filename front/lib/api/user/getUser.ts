import { User } from "@/types/user";
import { getFetch } from "../fetcher/getFetch";
import { FetchResult } from "@/types/fetchResult";

/**
 * userIdからユーザー情報を取得する
 * @param userId ユーザーID
 * @returns Promise<User> ユーザー情報
 */

export const getUser = async (
  userId: string,
): Promise<FetchResult<User>> => {

  const result = await getFetch<User>(
    `/users/${userId}`,
    )

  return result;
};