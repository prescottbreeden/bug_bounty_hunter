import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject, Observable } from 'rxjs';
import { MapUserData, UserModel } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private emitTokenChanged = new Subject<any>();
  tokenEmitted$ = this.emitTokenChanged.asObservable();

  constructor(private http: HttpClient) { }

  emailExists(credentials): Observable<UserModel|null> {
    return this.http.post('/api/auth/email/', credentials)
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

  login(credentials): Observable<boolean> {
    return this.http.post('/api/auth/login', credentials)
      .pipe(map(token => {
        if (token) {
          localStorage.setItem('token', token.toString());
          this.emitTokenChanged.next(token);
          return true;
        }
        return false;
      }));
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return false;
  }

  getToken() {
    const helper = new JwtHelperService();
    let token = localStorage.getItem('token');
    return helper.decodeToken(token);
  }

  newToken(user: UserModel) {
    return this.http.post('/api/auth/id', user.user_id)
      .pipe(map(token => {
        if (token) {
          localStorage.setItem('token', token.toString());
          this.emitTokenChanged.next(token);
          return true;
        }
        return false;
      }));
  }

}

