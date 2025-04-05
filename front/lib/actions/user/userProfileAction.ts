"use server"

import { userProfile } from "@/lib/api/user/userProfile"

export const userProfileAction = async (userId: string) => {
  const res = await userProfile(userId);

  if (!res.isOk) {
    return { error: res.body.error }
  }

  const { user, tree, souls, performance } = res.body.data;
  return { user, tree, souls, performance };
}
