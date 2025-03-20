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

export async function getUserBySoulOwnerIdAction(uuid: string) {
  try {
    const user = await getUsersId(uuid);

    const OwnerSouls = user[0].souls.filter(soul => soul.owner_id === user[0].uuid);

    return OwnerSouls.length;
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

export async function getFavoritesByUserCreatedSoulsAction(uuid: string) {
  try {
    const user = await getUsersId(uuid);
    const favorite = await getUsersId(uuid);
    const UserSouls = user[0].souls;
    const FavoriteSouls = UserSouls.filter(soul => soul.id === favorite.soul_id);
    return FavoriteSouls.length;
  } catch (error) {
    console.error("ユーザーのコトダマいいね取得失敗:", error);
  }
}

export async function getSoulsHarvestedCountAction(uuid: string) {
  try {
    const user = await getUsersId(uuid);
    const HarvestedCount = user[0].souls.reduce((sum, soul) => sum + soul.harvested_count, 0);
    return HarvestedCount;
  } catch (error) {
    console.error("ユーザーのコトダマのささげた回数取得失敗:", error);
  }
}
