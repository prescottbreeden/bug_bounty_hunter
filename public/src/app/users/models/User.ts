export interface User {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  admin: boolean;
  created_at: string | Date;
  updated_at: string | Date;
}