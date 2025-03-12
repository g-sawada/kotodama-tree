export interface User {
  uuid: string;
  name: string;
  level: number;
  exp: number;
  max_create_souls: number;
  max_carry_souls: number;
  provider: string;
  provider_id: string;
}
