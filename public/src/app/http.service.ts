import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getUsers() {
    return this._http.get('/api/users');
  }
  getById(id: number) {
    return this._http.get('/api/users/' + id);
  }
  getByEmail(email: string) {
    return this._http.get('/api/users/' + email);
  }
  createUser(newUser) {
    return this._http.post('/api/users', newUser);
  }
  validate(newUser) {
    return this._http.post('/validate', newUser);
  }

  getBugs() {
    return this._http.get('/api/bugs');
  }
  getOneBug(id: number) {
    return this._http.get('/api/bugs/' + id);
  }
  createBug(newBug: any) {
    return this._http.post('/api/bugs', newBug);
  }
}
