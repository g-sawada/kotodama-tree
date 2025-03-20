"use server"

import { setFlash } from "@/lib/api/flash/setFlash";
import { createUser } from "@/lib/api/user/createUser";
import { redirect } from "next/navigation";

export default async function createUserAction(formData: FormData) {
  const name = formData.get("name") as string;
  const provider = formData.get("provider") as string;
  const provider_id = formData.get("provider_id") as string;

  if(!name) {
    console.error("ユーザー名が入力されていません");
    redirect("/signup");
  }

  const result = await createUser(name, provider, provider_id);
  console.log("result");
  console.log(result);
  
  if (!result.isOk) {
    console.error("ユーザーの作成時にエラーが発生しました");
    redirect("/signup");
  }

  console.log("ユーザーの作成に成功しました");
  await setFlash("success", "ユーザーの作成に成功しました");
  redirect("/loggedIn");
} 