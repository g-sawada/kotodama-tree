export interface User {
  id: string;
  name: string;
  level: number;
  exp: number;
  max_create_souls: number;
  max_carry_souls: number;
  last_visit_room: string;
  created_souls_count: number;
  carrying_souls_count: number;
  room_id: string;
  created_at: string;
  updated_at: string;
}
