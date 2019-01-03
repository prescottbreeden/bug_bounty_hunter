import { MapBugDatum } from './Bug';
import { MapAnswerData } from './Answer';

export function buildBugObject(data): any {
  let allData: any = {
    bug: {},
    answers: []
  };
  allData.bug = MapBugDatum(data[0]);
  allData.bug.traceback = JSON.parse(allData.bug.traceback); 
  allData.bug.message = JSON.parse(allData.bug.message);
  allData.answers = MapAnswerData(data);
  return allData;
}