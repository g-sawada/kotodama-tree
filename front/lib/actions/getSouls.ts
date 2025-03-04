/**
 * use server ディレクティブを使用した，コトダマ一覧取得アクション
 *
 */

"use server"

import { getSoulsByOwnerId } from "../api/soul/getSouls";

// 手持ちのコトダマ一覧を取得するアクション
export async function getSoulsByOwnerIdAction(owner_id: string) {
  try {
    return getSoulsByOwnerId(owner_id);
  } catch (error) {
    console.error("コトダマ取得失敗:", error);
  }
}