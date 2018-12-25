export interface Bug {
  bug_id: string | number;
  posted_by: string | number;
  title: string;
  traceback: string;
  created_at: string | Date;
  updated_at: string | Date;
}

export interface NewBug {
  posted_by: string;
  title: string;
  traceback: string;
}

export function MapBugData(data): Bug {
  return {
    bug_id: data['bug_id'],
    posted_by: data['posted_by'],
    title: data['title'],
    traceback: data['traceback'],
    created_at: data['created_at'],
    updated_at: data['updated_at']
  }
}