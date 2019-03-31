import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/common/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
})
export class NavComponent implements OnInit {
  loggedIn = false;
  showFactions = false;
  token: any;

  rebels = {
    bugs_posted: '',
    bugs_answered: '',
  }
  empire = {
    bugs_posted: '',
    bugs_answered: '',
  }
  jedis = {
    bugs_posted: '',
    bugs_answered: '',
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    authService.tokenEmitted$.subscribe(token => {
      if (token) {
        this.loggedIn = true;
        this.token = authService.getToken();
      }
    })
  }

  ngOnInit() {
    this.token = this.authService.getToken();
    if (this.token) { this.loggedIn = true; }
    this.generateStats();
  }

  generateStats() {
    this.userService.getFactionStats(1).subscribe(result => {
      this.rebels.bugs_posted = result[0]['bugs'];
      this.rebels.bugs_answered = result[0]['answers'];
    })
    this.userService.getFactionStats(2).subscribe(result => {
      this.empire.bugs_posted = result[0]['bugs'];
      this.empire.bugs_answered = result[0]['answers'];
    })
    this.userService.getFactionStats(3).subscribe(result => {
      this.jedis.bugs_posted = result[0]['bugs'];
      this.jedis.bugs_answered = result[0]['answers'];
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  toggleFactions() {
    this.showFactions = !this.showFactions;
  }

}
