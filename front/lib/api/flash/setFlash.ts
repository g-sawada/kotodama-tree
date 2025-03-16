import { FlashContent } from "@/types/flashContent";

/**
 * cookieにflashをセットするfetcher
 * サーバー側でflashメッセージをセットするために使用
 */

import { cookies } from "next/headers";

export const setFlash = async (
  type: "error" | "success" | "info" | "warning",
  message: string
) => {
  const flashData: FlashContent = { type, message };
  const cookiesStore = await cookies();
  cookiesStore.set("flash", JSON.stringify(flashData));
  return;
}