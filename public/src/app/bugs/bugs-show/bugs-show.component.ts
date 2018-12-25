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
  bugs: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    const token = this.authService.getToken();
    if (!token) {
      this.authService.logout();
      this.router.navigate(['/']);
    } else {
      this.httpService.getBugs()
        .subscribe(results => {
          this.bugs = results;
        })
    }
  }

}
