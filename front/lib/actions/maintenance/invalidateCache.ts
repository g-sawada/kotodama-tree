"use server"

import { revalidateTag } from "next/cache";
import { MAINTENANCE_CACHE_TAG } from "@/lib/api/maintenance/getMaintenance";

export async function invalidateCache() {
  try {
    console.log("============ invalidateCache Action ============");
    revalidateTag(MAINTENANCE_CACHE_TAG)
    console.log("============ revalidateTag Done ============");
  }catch (error) {
    console.error('[Action /maintenance/invalidateCache] Unexpected error:', error);
  }
}