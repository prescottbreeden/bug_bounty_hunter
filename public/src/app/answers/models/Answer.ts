export interface AnswerModel {
  answer_id: string;
  bug_id: string;
  posted_by: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface NewAnswer {
  bug_id: string;
  posted_by: string;
  content: string;
}

export function MapAnswerData(data): AnswerModel {
  return {
    answer_id: data['answer_id'],
    bug_id: data['bug_id'],
    posted_by: data['posted_by'],
    content: data['content'],
    created_at: data['created_at'],
    updated_at: data['updated_at']
  }
}

export function convertData(data: any) {
  return [data];
}