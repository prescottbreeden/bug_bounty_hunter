import { Component, OnInit } from '@angular/core';
import { NewBug, NewBugErrors, ValidateNewBug } from 'src/app/common/models/Bug';
import { AuthService } from 'src/app/common/services/auth.service';
import { BugService } from 'src/app/common/services/bug.service';
import { Router } from '@angular/router';
import { UserToken, UserModel, MapUserData } from 'src/app/common/models/User';
import { isNull } from 'util';

@Component({
  selector: 'app-bugs-create',
  templateUrl: './bugs-create.component.html',
})
export class BugsCreateComponent implements OnInit {
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
    const token = this.authService.getToken();
    if (isNull(token)) {
      return this.router.navigate(['/']);
    }
    this.user = MapUserData(token.currentUser);
    this.newBug.posted_by = this.user.user_id;
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
  }

}
