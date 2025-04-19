import { User } from "@/types/user";
import { Favorite } from "@/types/favorite";

export interface Soul {
  id: number;
  content: string;
  harvested_count: number;
  owner_id: string;
  creator_id: string;
  home_tree_id: number;
  captured_tree_id: number;
  exp: number;
  created_at: string;
  updated_at: string;
  creator: User;
  favorites: Favorite[];
}
