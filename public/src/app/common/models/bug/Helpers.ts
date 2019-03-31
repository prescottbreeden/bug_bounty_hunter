import { MapAnswerData } from '../answer/Answer';
import { NewBug } from './NewBug';
import { NewBugErrors } from './NewBugErrors';

export function buildBugObject(data): any {
  let allData: any = {
    bug: {},
    answers: []
  };
  allData.bug = data[0];
  allData.bug.traceback = JSON.parse(allData.bug.traceback);
  allData.bug.message = JSON.parse(allData.bug.message);
  allData.answers = MapAnswerData(data);
  return allData;
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