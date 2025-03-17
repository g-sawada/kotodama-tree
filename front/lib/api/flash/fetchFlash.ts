"use server";

import { FlashContent } from "@/types/flashContent";

/**
 * cookieからflashメッセージデータを取得するfetcher
 * components/layout/FlashMessage.tsxのuseEffect内で使用
 */

import { cookies } from "next/headers";

export const fetchFlash = async (): Promise<FlashContent | null> => {
  const cookiesStore = await cookies();
  const flashData = cookiesStore.get("flash")?.value || null;

  if (flashData) {
    // 取得したflashはcookieから削除
    cookiesStore.delete("flash");

    const parsedFlashData: FlashContent = JSON.parse(flashData);
    return parsedFlashData;
  }
  
  return null;
}