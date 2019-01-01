import { Component, OnInit } from '@angular/core';
import { NewBug } from 'src/app/common/models/Bug';
import { AuthService } from 'src/app/common/services/auth.service';
import { BugService } from 'src/app/common/services/bug.service';
import { Router } from '@angular/router';
import { UserToken } from 'src/app/common/models/User';

@Component({
  selector: 'app-bugs-create',
  templateUrl: './bugs-create.component.html',
})
export class BugsCreateComponent implements OnInit {
  token: UserToken;
  newBug: NewBug = {
    posted_by: '',
    error: '',
    traceback: '',
    message: ''
  };

  constructor(
    private authService: AuthService,
    private bugService: BugService,
    private router: Router
  ) { }

  ngOnInit() {
    this.token = this.authService.getToken();
    if (!this.token) {
      this.authService.logout();
      this.router.navigate(['/']);
    } else {
      console.log('token valid');
      this.newBug.posted_by = this.token.currentUser.user_id;
    }
  }

  onSubmitBug() {
    console.log(this.newBug);
    this.bugService.createBug(this.newBug)
      .subscribe(res => {
        console.log('new bug created: ', res);
      });
    this.router.navigate(['/bugs']);
  }

}
