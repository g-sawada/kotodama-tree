export interface User {
  id: string;
  name: string;
  level: number;
  exp: number;
  max_create_souls: number;
  max_carry_souls: number;
  provider: string;     // NOTE: 修正対象 providerとprovider_idは基本フロントには渡さない
  provider_id: string;
  created_at: string;
  updated_at: string;
}