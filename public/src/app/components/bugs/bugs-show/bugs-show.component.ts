import { Component, OnInit, } from '@angular/core';
import { AuthService } from 'src/app/common/services/auth.service';
import { Router } from '@angular/router';
import { BugService } from 'src/app/common/services/bug.service';
import { BugModel, MapBugData } from 'src/app/common/models/Bug';
import { UserModel, MapUserData } from 'src/app/common/models/User';
import { isNull } from 'util';

@Component({
  selector: 'app-bugs-show',
  templateUrl: './bugs-show.component.html',
})
export class BugsShowComponent implements OnInit {
  user: UserModel;
  bugs: BugModel[] = [];
  searchText: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private bugService: BugService
  ) { }

  ngOnInit() {
    const token = this.authService.getToken();
    if (isNull(token)) {
      return this.router.navigate(['/']);
    }
    this.user = MapUserData(token.currentUser);
    this.bugService.getBugs().subscribe(results => {
      this.bugs = MapBugData(results);
    });
  }

}
