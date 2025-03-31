"use server"

import { getUsersId } from "../api/user/getUsers"

export async function getUsersIdAction(uuid: string) {
  try {
    const user = await getUsersId(uuid);
    return user[0];
  } catch (error) {
    console.error("ユーザー取得失敗:", error);
    return null;
  }
}

export async function getUserBySoulCreatorIdAction(uuid: string) {
  try {
    const user = await getUsersId(uuid);

    const CreatorSouls = user[0].souls.filter(soul => soul.creator_id === user[0].uuid);

    return CreatorSouls;  // creator_id が一致する soul を返す
  } catch (error) {
    console.error("ユーザーの関連するコトダマ取得失敗:", error);
    return null;
  }
}

export async function getUserByTreeIdAction(uuid: string) {
  try {
    const user = await getUsersId(uuid);
    return user[0].tree;
  }  catch (error) {
    console.error("ユーザーの関連するコトダマ取得失敗:", error);
    return null;
  }
}
