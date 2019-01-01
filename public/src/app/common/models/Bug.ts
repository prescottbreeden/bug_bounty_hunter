export interface BugModel {
  bug_id: string | number;
  posted_by: string | number;
  error: string;
  traceback: string;
  message: string;
  bug_created: string;
  bug_updated: string;
  num_answers: string | number;
}

export interface NewBug {
  posted_by: string | number;
  error: string;
  traceback: string;
  message: string;
}

export function MapBugDatum(data): BugModel {
  return {
    bug_id: data['bug_id'],
    posted_by: data['posted_by'],
    error: data['error'],
    traceback: data['traceback'],
    message: data['message'],
    bug_created: data['bug_created'],
    bug_updated: data['bug_updated'],
    num_answers: data['num_answers']
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
      message: datum['message'],
      bug_created: datum['bug_created'],
      bug_updated: datum['bug_updated'],
      num_answers: datum['num_answers']
    }
    bugs.push(bug);
  });
  return bugs;
}