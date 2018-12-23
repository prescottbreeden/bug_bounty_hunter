import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  isUnique(credentials) {
    return this._http.post('/authservice/validate/email/', credentials);
  }

  login(credentials) {
    return this._http.post('/authservice/authenticate', credentials);
  }

  logout() {

  }

  isLoggedIn() {
    return false;
  }
}

