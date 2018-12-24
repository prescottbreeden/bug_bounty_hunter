import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/users/auth.service';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';
import { Bug } from '../models/Bug';

@Component({
  selector: 'app-bugs-show',
  templateUrl: './bugs-show.component.html',
  styleUrls: ['./bugs-show.component.scss']
})
export class BugsShowComponent implements OnInit {
  token: any | null;
  bugs: Bug | any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    const token = this.authService.getToken();
    console.log('Current user: ', token);
    if (!token) {
      this.authService.logout();
      this.router.navigate(['/']);
    } else {
      const buggies = this.httpService.getBugs();
      if (buggies instanceof Array) {
        this.bugs = buggies;
      }
      console.log(this.bugs);
    }
  }

}
