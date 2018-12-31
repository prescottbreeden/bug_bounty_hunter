import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../common/services/auth.service';
import { Router } from '@angular/router';
import { UserToken } from '../common/models/User';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
})
export class NavComponent implements OnInit {
  loggedIn: boolean;
  token: UserToken;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { 
    authService.tokenEmitted$.subscribe(token => {
      console.log(token);
      if (token) {
        this.loggedIn = true;
        this.token = authService.getToken();
      }
    })
  }

  ngOnInit() { 
    this.token = this.authService.getToken();
    if (this.token) { this.loggedIn = true; }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
