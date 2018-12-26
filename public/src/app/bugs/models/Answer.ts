export interface AnswerModel {
  answer_id: string | number;
  bug_id: string | number;
  answered_by: string | number;
  answer_content: string;
  answer_created: string;
  answer_updated: string;
}

export interface NewAnswer {
  bug_id: string | number;
  answered_by: string;
  answer_content: string;
}

export function MapAnswerData(data): AnswerModel[] {
  let answers = [];
  data.forEach(datum => {
    const answer = {
      answer_id: datum['answer_id'],
      bug_id: datum['bug_id'],
      answered_by: datum['answered_by'],
      answer_content: datum['answer_content'],
      answer_created: datum['answer_created'],
      answer_updated: datum['answer_updated']
    }
    answers.push(answer);
  });
  return answers;
}