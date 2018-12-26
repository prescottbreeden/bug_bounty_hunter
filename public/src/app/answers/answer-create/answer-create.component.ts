import { Component, OnInit } from '@angular/core';
import { NewAnswer } from '../models/Answer';
import { AnswerService } from 'src/app/answers/services/answer.service';
import { AuthService } from 'src/app/users/services/auth.service';
import { Router } from '@angular/router';
import { BugService } from 'src/app/bugs/services/bug.service';

@Component({
  selector: 'app-answer-create',
  templateUrl: './answer-create.component.html',
  styleUrls: ['./answer-create.component.scss']
})
export class AnswerCreateComponent implements OnInit {
  newAnswer: NewAnswer = {
    bug_id: '',
    posted_by: '',
    content: ''
  };

  constructor(
    private answerService: AnswerService,
    private bugService: BugService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    const token = this.authService.getToken()
    if (!token) {
      this.router.navigate(['/']);
    } else {
      this.newAnswer.posted_by = token.currentUser.user_id;
      console.log(this.newAnswer);
    }
  }

}
