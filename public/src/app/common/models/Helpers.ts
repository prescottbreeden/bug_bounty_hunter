import { MapBugDatum } from './Bug';
import { MapAnswerData } from './Answer';

export function jsonDecode(string): string {
  return JSON.parse(string);
}

export function jsonEncode(string): string {
  return JSON.stringify(string);
}

export function buildBugObject(data): any {
  let allData: any = {
    bug: {},
    answers: []
  };
  allData.bug = MapBugDatum(data[0]);
  allData.bug.traceback = jsonDecode(allData.bug.traceback);
  allData.bug.message = jsonDecode(allData.bug.message);
  allData.answers = MapAnswerData(data);
  return allData;
}