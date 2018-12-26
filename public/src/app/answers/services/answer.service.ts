import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Answer, NewAnswer } from '../models/Answer';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private http: HttpClient) { }

  getAnswers() { 
    return this.http.get('/api/answers'); 
  }
  getAnswerById(id: number) {
    return this.http.get('/api/answers/' + id); 
  }
  createAnswer(newAnswer: NewAnswer) {
    return this.http.post('/api/answers', newAnswer); 
  }
  updateAnswer(answer: Answer) {
    return this.http.put('/api/answers/' + answer.answer_id, answer);
  }
  deleteAnswer(id: number) {
    return this.http.delete('/api/answers/' + id);
  }
}
