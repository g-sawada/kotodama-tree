/**
 * user_data
 * user,tree,soulの情報を取得する
 */

import { FetchResult } from "@/types/fetchResult";
import { User } from "@/types/user";
import { Tree } from "@/types/tree";
import { Soul } from "@/types/soul";
import { Performance } from "@/types/performance";

export interface UserProfileResponse {
  user: User;
  tree: Tree;
  souls: Soul[];
  performance: Performance;
};

export const userProfile = async (
  userId: string,
): Promise<FetchResult<UserProfileResponse>> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/users/${userId}/profile`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      }
    );
    const body = await res.json();
    console.log("body:", body);

    if (!res.ok) {
      return {
        status: res.status,
        isOk: false,
        body: { error: body.error }
      };
    } else {
      return {
        status: res.status,
        isOk: true,
        body: { data: body.data, message: body.message }
      };
    }
  } catch {
    return {
      status: 500,
      isOk: false,
      body: { error: "サーバー通信エラー" }
    };
  }
};
