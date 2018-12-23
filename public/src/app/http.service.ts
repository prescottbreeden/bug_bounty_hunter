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

  createUser(newUser) {
    return this._http.post('/api/users', newUser);
  }

  isUnique(email: string) {
    return this._http.get('/validate/email/' + email);
  }

  login(newUser) {
    return this._http.post('/login', newUser);
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
