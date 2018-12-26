import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/users/services/auth.service';
import { Router } from '@angular/router';
import { AnswerService } from 'src/app/answers/services/answer.service';

@Component({
  selector: 'app-answer-show',
  templateUrl: './answer-show.component.html',
  styleUrls: ['./answer-show.component.scss']
})
export class AnswerShowComponent implements OnInit {
  answers: any;

  constructor(
    private authService: AuthService,
    private answerService: AnswerService,
    private router: Router
  ) { }

  ngOnInit() {
    const token = this.authService.getToken();
    if (!token) {
      this.authService.logout();
      this.router.navigate(['/']);
    } else {
      this.answerService.getAnswers()
        .subscribe(results => {
          this.answers = results;
        })
    }
  }
  }

}
