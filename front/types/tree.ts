export interface Tree {
  id: number;
  user_id: string;
  room_id: string;
  level: number;
  exp: number;
  last_charged_at: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export type TreeWithProgress = Tree & { exp_progress_percent: number };
