export interface Bug {
  bug_id: string | number;
  user_id: string | number;
  title: string;
  traceback: string;
  created_at: string | Date;
  updated_at: string | Date;
}