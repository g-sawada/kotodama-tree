import { NextResponse } from "next/server";
import { getMaintenance } from "@/lib/api/maintenance/getMaintenance";

// メンテナンス情報取得 API をコールする処理をRoute Handlerにを経由するように実装
// Data Cacheを使用するため
export async function GET() {
  try {
    const result = await getMaintenance();
    return NextResponse.json(result);
  } catch (error) {
    // 予期しないエラー
    console.error('[Route Handler /api/maintenance] Unexpected error:', error);
    return NextResponse.json(
      {
        status: 500,
        isOk: false,
        body: { error: 'Internal Server Error in Route Handler' },
      },
      { status: 500 })
  }
}