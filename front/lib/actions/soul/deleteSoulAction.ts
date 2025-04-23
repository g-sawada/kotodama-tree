"use server"

import { deleteSoul } from "@/lib/api/soul/deleteSoul";


export const deleteSoulAction = async (
  soulId: number,
  userId: string
) => {
  const result = await deleteSoul(soulId, userId); //API呼び出し

  if (result.isOk) {
    console.log("削除成功：", result.body.message);
  } else {
    console.error("削除失敗：", result.body.error);
  }

  return result;
}
