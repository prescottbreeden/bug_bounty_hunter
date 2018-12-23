import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  login(credentials) {
    return this._http.post('/api/authenticate',
      JSON.stringify(credentials));
  }

  logout() {

  }

  isLoggedIn() {
    return false;
  }
}
