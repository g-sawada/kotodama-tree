"use server"

import { userProfile } from "@/lib/api/user/userProfile"

export const userProfileAction = async (userId: string) => {
  const res = await userProfile(userId);

  if (!res.isOk) {
    throw new Error(res.body.error || "ユーザー情報の取得に失敗しました");
  }

  const { user, tree, souls } = res.body.data;
  return { user, tree, souls };
}
