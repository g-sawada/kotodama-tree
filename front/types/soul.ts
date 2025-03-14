export interface Soul {
  id: number;
  content: string;
  captured_count: number;
  harvested_count: number;
  created_at: string;
  updated_at: string;
  owner_id: string;
  creator_id: string;
  home_tree_id: string;
  captured_tree_id: string;
  exp: number;
}