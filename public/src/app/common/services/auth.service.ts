import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject, Observable } from 'rxjs';
import { NewUser } from "../models/user/NewUser";
import { User } from "../models/user/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private emitTokenChanged = new Subject<any>();
  tokenEmitted$ = this.emitTokenChanged.asObservable();

  constructor(private http: HttpClient) { }

  emailExists(credentials): Observable<User|null> {
    return this.http.post('/api/auth/email/', credentials)
      .pipe(map(result => {
        if (result instanceof Array) {
          if (result.length > 0) {
            const response = result[0];
            return response;
          }
        }
        return null;
      }));
  }

  login(user: NewUser): Observable<boolean> {
    return this.http.post('/api/auth/login', user)
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

  newToken(user: User): Observable<boolean> {
    return this.http.get(`/api/auth/${user.user_id}`)
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

