export interface BugModel {
  bug_id: string | number;
  posted_by: string | number;
  error: string;
  traceback: string;
  bug_created: string;
  bug_updated: string;
}

export interface NewBug {
  posted_by: string | number;
  error: string;
  traceback: string;
}

export function MapBugDatum(data): BugModel {
  return {
    bug_id: data['bug_id'],
    posted_by: data['posted_by'],
    error: data['error'],
    traceback: data['traceback'],
    bug_created: data['bug_created'],
    bug_updated: data['bug_updated']
  }
}

export function MapBugData(data): BugModel[] {
  let bugs = [];
  data.forEach(datum => {
    const bug = {
      bug_id: datum['bug_id'],
      posted_by: datum['posted_by'],
      error: datum['error'],
      traceback: datum['traceback'],
      bug_created: datum['bug_created'],
      bug_updated: datum['bug_updated']
    }
    bugs.push(bug);
  });
  return bugs;
}