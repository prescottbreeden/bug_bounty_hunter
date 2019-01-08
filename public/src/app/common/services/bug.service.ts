import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewBug, BugModel } from '../../common/models/Bug';
import { NewAnswer, AnswerModel } from '../../common/models/Answer';

@Injectable({
  providedIn: 'root'
})
export class BugService {

  constructor(private http: HttpClient) { }

  getBugs() { 
    return this.http.get('/api/bugs'); 
  }
  getBugById(bug_id: number) {
    return this.http.get('/api/bugs/' + bug_id); 
  }
  createBug(newBug: NewBug) {
    return this.http.post('/api/bugs', newBug); 
  }
  updateBug(bug: BugModel) {
    return this.http.put('/api/bugs/' + bug.bug_id, bug);
  }
  deleteBug(bug_id: number) {
    return this.http.delete('/api/bugs/' + bug_id);
  }


  getAnswer(answer_id: number) {
    return this.http.get('/api/answers/' + answer_id);
  }
  addAnswer(newAnswer: NewAnswer) {
    return this.http.post('/api/answers', newAnswer);
  }
  updateAnswer(answer: AnswerModel) {
    return this.http.put('/api/answers/' + answer.answer_id, answer);
  }


  isFavorite(data) {
    return this.http.get(`/api/bugs/favorites/${data.bug_id}/${data.user_id}`);
  }
  getFavorites(id: number) {
    return this.http.get('/api/bugs/favorites/' + id);
  }
  addFavorite(data: any) {
    return this.http.post('/api/bugs/favorites', data);
  }
  removeFavorite(data: any) {
    return this.http.delete(`/api/bugs/favorites/${data.bug_id}/${data.user_id}`);
  }
}
