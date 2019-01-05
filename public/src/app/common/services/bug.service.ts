import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewBug, BugModel } from '../../common/models/Bug';
import { NewAnswer } from '../../common/models/Answer';

@Injectable({
  providedIn: 'root'
})
export class BugService {

  constructor(private http: HttpClient) { }

  getBugs() { 
    return this.http.get('/api/bugs'); 
  }
  getBugById(id: string | number) {
    return this.http.get('/api/bugs/' + id); 
  }
  createBug(newBug: NewBug) {
    return this.http.post('/api/bugs', newBug); 
  }
  updateBug(bug: BugModel) {
    return this.http.put('/api/bugs/' + bug.bug_id, bug);
  }
  deleteBug(bug_id: string | number) {
    return this.http.delete('/api/bugs/' + bug_id);
  }
  addAnswer(newAnswer: NewAnswer) {
    return this.http.post('/api/answers', newAnswer);
  }
  getAnswer(answer_id: string | number) {
    return this.http.get('/api/answers/' + answer_id);
  }

  isFavorite(data) {
    return this.http.get(`/api/bugs/favorites/${data.bug_id}/${data.user_id}`);
  }
  getFavorites(id: string | number) {
    return this.http.get('/api/bugs/favorites/' + id);
  }

  addFavorite(data: any) {
    return this.http.post('/api/bugs/favorites', data);
  }

  removeFavorite(data: any) {
    return this.http.delete(`/api/bugs/favorites/${data.bug_id}/${data.user_id}`);
  }
}
