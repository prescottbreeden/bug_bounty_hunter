export interface Bug {
  bug_id: string | number;
  posted_by: string | number;
  title: string;
  traceback: string;
  created_at: string | Date;
  updated_at: string | Date;
}