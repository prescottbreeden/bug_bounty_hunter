export interface BugModel {
  bug_id: string | number;
  posted_by: string | number;
  title: string;
  traceback: string;
  bug_created: string;
  bug_updated: string;
}

export interface NewBug {
  posted_by: string | number;
  error: string;
  traceback: string;
}

export function MapBugData(data): BugModel[] {
  let bugs = [];
  data.forEach(datum => {
    const bug = {
      bug_id: datum['bug_id'],
      posted_by: datum['posted_by'],
      error: datum['error'],
      bug_created: datum['bug_created'],
      bug_updated: datum['bug_updated']
    }
    bugs.push(bug);
  });
  return bugs;
}