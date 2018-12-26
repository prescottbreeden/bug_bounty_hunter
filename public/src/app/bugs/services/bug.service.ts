import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewBug, BugModel } from '../models/Bug';

@Injectable({
  providedIn: 'root'
})
export class BugService {

  constructor(private http: HttpClient) { }

  getBugs() { 
    return this.http.get('/api/bugs'); 
  }
  getBugById(id: number) {
    return this.http.get('/api/bugs/' + id); 
  }
  createBug(newBug: NewBug) {
    return this.http.post('/api/bugs', newBug); 
  }
  updateBug(bug: BugModel) {
    return this.http.put('/api/bugs/' + bug.bug_id, bug);
  }
  deleteBug(id: number) {
    return this.http.delete('/api/bugs/' + id);
  }
}
