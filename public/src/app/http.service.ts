import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getUsers() {
    console.log('****** _http.getUsers()  ******');
    return this._http.get('/api/users');
  }

  getById(id: number) {
    console.log('****** _http.getById()  ******');
    return this._http.get('/api/users/' + id);
  }

  createUser(newUser) {
    console.log('****** _http.createUser()  ******');
    return this._http.post('/api/users', newUser);
  }

  isUnique(email: string) {
    console.log('****** _http.isUnique()  ******');
    return this._http.get('/api/users/validate/email/' + email);
  }

  login(newUser) {
    console.log('****** _http.getUsers()  ******');
    return this._http.post('/api/users/login', newUser);
  }

  getBugs() {
    console.log('****** _http.getUsers()  ******');
    return this._http.get('/api/bugs');
  }

  getOneBug(id: number) {
    console.log('****** _http.getUsers()  ******');
    return this._http.get('/api/bugs/' + id);
  }

  createBug(newBug: any) {
    console.log('****** _http.getUsers()  ******');
    return this._http.post('/api/bugs', newBug);
  }
}
