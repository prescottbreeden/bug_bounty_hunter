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
  deleteBug(id: string | number) {
    return this.http.delete('/api/bugs/' + id);
  }
  addAnswer(newAnswer: NewAnswer) {
    return this.http.post('/api/answers', newAnswer);
  }
  getAnswer(id: string | number) {
    return this.http.get('/api/answers/' + id);
  }
  getLikes(bug_id: string | number, user_id: string | number) {
    return this.http.get(`/api/bugs/likes/${bug_id}/${user_id}`)
  }
  likeBug(newLike: any) {
    return this.http.post('/api/bugs/likes', newLike);
  }
}
