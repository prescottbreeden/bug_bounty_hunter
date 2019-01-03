import { Component, OnInit, } from '@angular/core';
import { AuthService } from 'src/app/common/services/auth.service';
import { Router } from '@angular/router';
import { BugService } from 'src/app/common/services/bug.service';
import { BugModel, MapBugData } from 'src/app/common/models/Bug';
import { UserToken } from 'src/app/common/models/User';

@Component({
  selector: 'app-bugs-show',
  templateUrl: './bugs-show.component.html',
})
export class BugsShowComponent implements OnInit {
  token: UserToken;
  bugs: BugModel[] = [];
  searchText: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private bugService: BugService
  ) { }

  ngOnInit() {
    this.token = this.authService.getToken();
    if (!this.token) {
      this.authService.logout();
      this.router.navigate(['/']);
    } else {
      console.log('token valid');
      this.bugService.getBugs()
        .subscribe(results => {
          this.bugs = MapBugData(results);
          console.log(this.bugs);
        })
    }
  }

}
