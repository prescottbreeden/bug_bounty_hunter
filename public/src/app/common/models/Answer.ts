export interface AnswerModel {
  answer_id: number;
  bug_id: number;
  answered_by: number;
  answered_name: string;
  answer_profile: string;
  answer_content: string;
  answer_created: string;
  answer_updated: string;
}

export interface NewAnswer {
  bug_id: number;
  answered_by: number;
  answer_content: string;
}

export interface NewAnswerErrors {
  ContentField: string | null;
}

export function ValidateNewAnswer(data: NewAnswer): NewAnswerErrors {
  const errors = {
    ContentField: null
  } 
  if (!data.answer_content.length) {
    errors.ContentField = 'Answer is required.';
  }
  if (data.answer_content.length && data.answer_content.length < 10) {
    errors.ContentField = 'Answer must be 10 characters or more.'
  }
  return errors;
}

export function MapAnswerDatum(data): AnswerModel {
  return {
    answer_id: parseInt(data['answer_id']),
    bug_id: parseInt(data['bug_id']),
    answered_by: parseInt(data['answered_by']),
    answered_name: data['answered_name'],
    answer_profile: data['answer_profile'],
    answer_content: data['answer_content'],
    answer_created: data['answer_created'],
    answer_updated: data['answer_updated']
  }
}

export function MapAnswerData(data): AnswerModel[] {
  let answers = [];
  data.forEach(datum => {
    const answer = {
      answer_id: parseInt(datum['answer_id']),
      bug_id: parseInt(datum['bug_id']),
      answered_by: parseInt(datum['answered_by']),
      answered_name: datum['answered_name'],
      answer_profile: datum['answer_profile'],
      answer_content: datum['answer_content'],
      answer_created: datum['answer_created'],
      answer_updated: datum['answer_updated']
    }
    answer.answer_content = JSON.parse(answer.answer_content);
    answers.push(answer);
  });
  return answers;
}