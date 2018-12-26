import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/users/services/auth.service';
import { Router } from '@angular/router';
import { AnswerService } from 'src/app/answers/services/answer.service';
import { BugModel } from 'src/app/bugs/models/Bug';

@Component({
  selector: 'app-answer-show',
  templateUrl: './answer-show.component.html',
  styleUrls: ['./answer-show.component.scss']
})
export class AnswerShowComponent implements OnInit {
  bug: BugModel;
  answers: any;

  constructor(
    private authService: AuthService,
    private answerService: AnswerService,
    private router: Router
  ) { }

  ngOnInit() {
    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/']);
    } else {
      this.answerService.getAnswers()
        .subscribe(results => {
          this.answers = results;
        });
    }
  }
}
