import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/users/services/auth.service';
import { Router } from '@angular/router';
import { BugService } from '../services/bug.service';
// import { Bug } from '../models/Bug';

@Component({
  selector: 'app-bugs-show',
  templateUrl: './bugs-show.component.html',
  styleUrls: ['./bugs-show.component.scss']
})
export class BugsShowComponent implements OnInit {
  bugs: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private bugService: BugService
  ) { }

  ngOnInit() {
    const token = this.authService.getToken();
    if (!token) {
      this.authService.logout();
      this.router.navigate(['/']);
    } else {
      console.log('token valid');
      this.bugService.getBugs()
        .subscribe(results => {
          this.bugs = results;
        })
    }
  }

}
