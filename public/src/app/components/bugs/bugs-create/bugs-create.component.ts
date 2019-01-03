import { Component, OnInit } from '@angular/core';
import { NewBug, NewBugErrors, ValidateNewBug } from 'src/app/common/models/Bug';
import { AuthService } from 'src/app/common/services/auth.service';
import { BugService } from 'src/app/common/services/bug.service';
import { Router } from '@angular/router';
import { UserToken, UserModel } from 'src/app/common/models/User';

@Component({
  selector: 'app-bugs-create',
  templateUrl: './bugs-create.component.html',
})
export class BugsCreateComponent implements OnInit {
  token: UserToken;
  user: UserModel;
  newBug: NewBug = {
    posted_by: '',
    error: '',
    traceback: '',
    message: ''
  };
  formErrors: NewBugErrors = {
    ErrorField: null,
    TracebackField: null,
    MessageField: null
  }

  constructor(
    private authService: AuthService,
    private bugService: BugService,
    private router: Router
  ) { }

  ngOnInit() {
    this.token = this.authService.getToken();
    this.user = this.token.currentUser;
    if (!this.token) {
      this.authService.logout();
      this.router.navigate(['/']);
    } else {
      this.newBug.posted_by = this.token.currentUser.user_id;
    }
  }

  onSubmitBug() {
    this.formErrors = ValidateNewBug(this.newBug);
    if (this.formErrors.ErrorField === null 
      && this.formErrors.MessageField === null 
      && this.formErrors.TracebackField === null) {
      this.newBug.traceback = JSON.stringify(this.newBug.traceback);
      this.newBug.message = JSON.stringify(this.newBug.message);
      this.bugService.createBug(this.newBug)
        .subscribe(res => {
          console.log('new bug created: ', res);
        });
      this.router.navigate(['/bugs']);
    }
    else {
      console.log('Fail');
      console.log(this.formErrors);
    }
  }

}
