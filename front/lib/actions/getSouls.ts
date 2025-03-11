/**
 * use server ディレクティブを使用した，コトダマ一覧取得アクション
 *
 */

"use server"

import { getSoulsByCapturedTreeId, getSoulsByOwnerId, getSoulsWithExpByCapturedTreeId } from "../api/soul/getSouls";

// 手持ちのコトダマ一覧を取得するアクション
export async function getSoulsByOwnerIdAction(owner_id: string) {
  try {
    return getSoulsByOwnerId(owner_id);
  } catch (error) {
    console.error("コトダマ取得失敗:", error);
  }
}

// キのコトダマ一覧(expなし)を取得するアクション
export async function getSoulsByCapturedTreeIdAction(captured_tree_id: string) {
  try {
    return getSoulsByCapturedTreeId(captured_tree_id);
  } catch (error) {
    console.error("コトダマ取得失敗:", error);
  }
}

// キのコトダマ一覧(expあり)を取得するアクション
export async function getSoulsWithExpByCapturedTreeIdAction(captured_tree_id: string) {
  try {
    return getSoulsWithExpByCapturedTreeId(captured_tree_id);
  } catch (error) {
    console.error("コトダマ取得失敗:", error);
  }
}