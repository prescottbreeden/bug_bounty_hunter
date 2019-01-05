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

  constructor(private http: HttpClient) { }

  emailExists(credentials) {
    return this.http.post('/authservice/validate/email/', credentials)
      .pipe(map(result => {
        if (result instanceof Array) {
          if (result.length > 0) {
            const response = MapUserData(result[0]);
            return response;
          }
        }
        return null;
      }));
  }

  login(credentials) {
    return this.http.post('/authservice/authenticate', credentials)
      .pipe(map(token => {
        if (token) {
          localStorage.setItem('token', token.toString());
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

