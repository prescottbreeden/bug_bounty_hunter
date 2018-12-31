import { Component, OnInit, } from '@angular/core';
import { AuthService } from 'src/app/common/services/auth.service';
import { Router } from '@angular/router';
import { BugService } from 'src/app/common/services/bug.service';
import { BugModel, MapBugData } from '../../common/models/Bug';
// import { Bug } from '../models/Bug';

@Component({
  selector: 'app-bugs-show',
  templateUrl: './bugs-show.component.html',
})
export class BugsShowComponent implements OnInit {
  bugs: BugModel[];
  searchTerm: string;

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
          this.bugs = MapBugData(results);
        })
    }
  }

}
