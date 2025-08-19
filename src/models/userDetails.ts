export interface UserDetail {
  username: string;
  email: string;
  full_name: string;
  created_at?: Date;
  updated_at?: Date;
  token: string;
}