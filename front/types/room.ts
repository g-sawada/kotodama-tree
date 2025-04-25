import { Pathway } from "./pathway";
import { Tree } from "./tree";

export interface Room {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

// 部屋情報取得API rooms#show のレスポンス型
export interface RoomInfo {
  room: Room;
  pathways: Pathway[];
  tree: Tree;
  roomOwnerName: string;
};