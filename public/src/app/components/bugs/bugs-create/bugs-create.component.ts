import { Component, OnInit } from '@angular/core';
import { ValidateNewBug } from 'src/app/common/models/bug/Helpers';
import { NewBugErrors } from "src/app/common/models/bug/NewBugErrors";
import { NewBug } from "src/app/common/models/bug/NewBug";
import { AuthService } from 'src/app/common/services/auth.service';
import { BugService } from 'src/app/common/services/bug.service';
import { Router } from '@angular/router';
import { User } from 'src/app/common/models/user/User';
import { isNull } from 'util';
@Component({
  selector: 'app-bugs-create',
  templateUrl: './bugs-create.component.html',
})
export class BugsCreateComponent implements OnInit {
  showHelp = false;
  user = new User;
  newBug = new NewBug;

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
    this.user = token.currentUser;
    this.newBug.posted_by = this.user.user_id;
  }

  onSubmitBug() {
    this.formErrors = ValidateNewBug(this.newBug);
    if (this.formErrors.ErrorField === null
      && this.formErrors.MessageField === null
      && this.formErrors.TracebackField === null) {
      this.newBug.traceback = JSON.stringify(this.newBug.traceback);
      this.newBug.message = JSON.stringify(this.newBug.message);
      this.bugService.createBug(this.newBug).subscribe();
      const balls: any = { bugs: this.user.bugs++, ...this.user };
      this.authService.UserInfo = balls;
      this.router.navigate(['/bugs']);
    }
  }

  toggleHelp() {
    this.showHelp = !this.showHelp;
  }

}
