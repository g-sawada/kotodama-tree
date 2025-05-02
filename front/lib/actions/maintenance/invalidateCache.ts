"use server"

import { revalidateTag } from "next/cache";
import { MAINTENANCE_CACHE_TAG } from "@/lib/api/maintenance/getMaintenance";

export async function invalidateCache() {
  try {
    // メンテナンス情報のキャッシュを無効化
    revalidateTag(MAINTENANCE_CACHE_TAG)
  }catch (error) {
    console.error('[Action /maintenance/invalidateCache] Unexpected error:', error);
  }
}