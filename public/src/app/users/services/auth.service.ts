import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
// import { Observable } from 'rxjs/Observable';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private emitTokenChanged = new Subject<any>();
  tokenEmitted$ = this.emitTokenChanged.asObservable();

  constructor(private _http: HttpClient) { }

  isUnique(credentials) {
    return this._http.post('/authservice/validate/email/', credentials)
      .pipe(map(response => {
        if (response instanceof Array) {
          if (response.length > 0) {
            return true;
          }
        }
        return false;
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

