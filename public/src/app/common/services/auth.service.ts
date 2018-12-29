import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';
import { MapUserData } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private emitTokenChanged = new Subject<any>();
  tokenEmitted$ = this.emitTokenChanged.asObservable();

  constructor(private _http: HttpClient) { }

  isUnique(credentials) {
    return this._http.post('/authservice/validate/email/', credentials)
      .pipe(map(result => {
        if (result instanceof Array) {
          if (result.length === 1) {
            const response = MapUserData(result[0]);
            return response;
          }
        }
        return null;
      }));
  }

  login(credentials) {
    return this._http.post('/authservice/authenticate', credentials)
      .pipe(map(token => {
        if (token) {
          localStorage.setItem('token', token.toString());
          this.emitTokenChanged.next(token);
          return true;
        }
        return false;
      }));
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    return false;
  }

  getToken() {
    const helper = new JwtHelperService();
    let token = localStorage.getItem('token');
    return helper.decodeToken(token);
  }

}

