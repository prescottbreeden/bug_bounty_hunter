export interface BugModel {
  bug_id: string | number;
  posted_by: string | number;
  posted_name: string;
  error: string;
  traceback: string;
  message: string;
  view_count: string | number;
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

export interface NewBugErrors {
  ErrorField: string | null;
  TracebackField: string | null;
  MessageField: string | null;
}

export function ValidateNewBug(data: NewBug): NewBugErrors {
  const errors = {
    ErrorField: null,
    TracebackField: null,
    MessageField: null
  } 
  if (!data.error.length) {
    errors.ErrorField = 'Error is required.';
  }
  if (data.error.length && data.error.length < 10) {
    errors.ErrorField = 'Error must be 10 characters or more.'
  }
  if (!data.traceback.length) {
    errors.TracebackField = 'Stack trace is required.';
  }
  if (!data.message.length) {
    errors.MessageField = 'Comments are required.';
  }
  return errors;
}

export function MapBugDatum(data): BugModel {
  return {
    bug_id: data['bug_id'],
    posted_by: data['posted_by'],
    posted_name: data['posted_name'],
    error: data['error'],
    traceback: data['traceback'],
    message: data['message'],
    view_count: data['view_count'],
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
      posted_name: datum['posted_name'],
      error: datum['error'],
      traceback: datum['traceback'],
      message: datum['message'],
      view_count: datum['view_count'],
      bug_created: datum['bug_created'],
      bug_updated: datum['bug_updated'],
      num_answers: datum['num_answers']
    }
    bugs.push(bug);
  });
  return bugs;
}

