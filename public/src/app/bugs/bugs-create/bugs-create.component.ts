import { Component, OnInit } from '@angular/core';
import { NewBug } from '../models/Bug';
import { AuthService } from 'src/app/users/services/auth.service';
import { BugService } from 'src/app/bugs/services/bug.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bugs-create',
  templateUrl: './bugs-create.component.html',
  styleUrls: ['./bugs-create.component.scss']
})
export class BugsCreateComponent implements OnInit {
  newBug: NewBug = {
    posted_by: '',
    title: '',
    traceback: ''
  };

  constructor(
    private authService: AuthService,
    private bugService: BugService,
    private router: Router
  ) { }

  ngOnInit() {
    const token = this.authService.getToken()
    if (!token) {
      this.router.navigate(['/']);
    } else {
      this.newBug.posted_by = token.currentUser.user_id;
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
