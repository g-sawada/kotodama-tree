import { User } from "@/types/user";
import { getFetch } from "../fetcher/getFetch";
import { redirect } from "next/navigation";

/**
 * userIdからユーザー情報を取得する
 * @param userId ユーザーID
 * @returns Promise<User> ユーザー情報
 */

export const getUser = async (
  userId: string,
): Promise<User> => {

  const result = await getFetch<User>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/users/${userId}`,
    )

  // 仮実装。ユーザー情報が取得できない場合はloginページにリダイレクト 
  if (!result.isOk) {
    redirect("/login");
  }
  const user = result.body.data;
  return user;
};