import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewBug, BugModel } from '../../common/models/Bug';
import { NewAnswer } from '../../common/models/Answer';
import { map } from 'rxjs/operators';

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

  isFavorite(data) {
    return this.http.get(`/api/bugs/likes/${data.bug_id}/${data.user_id}`);
  }

  addFavorite(data: any) {
    return this.http.post('/api/bugs/likes', data);
  }

  removeFavorite(data: any) {
    return this.http.delete(`/api/bugs/likes/${data.bug_id}/${data.user_id}`);
  }
}
