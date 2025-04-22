'use server'

import { cookies } from "next/headers";
import { FlashContent } from "@/types/flashContent";

/**
 * cookieにflashをセットする
 * サーバー側でflashメッセージをセットするために使用
 * 必ずサーバーアクションから実行する
 */

export const setFlash = async (
  type: "error" | "success" | "info" | "warning",
  message: string
) => {
  const flashData: FlashContent = { type, message };
  const cookiesStore = await cookies();
  cookiesStore.set("flash", JSON.stringify(flashData));
  return;
}