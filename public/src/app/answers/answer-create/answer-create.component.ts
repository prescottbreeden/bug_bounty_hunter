import { Component, OnInit } from '@angular/core';
import { NewAnswer } from '../models/Answer';
import { AnswerService } from 'src/app/answers/services/answer.service';
import { AuthService } from 'src/app/users/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-answer-create',
  templateUrl: './answer-create.component.html',
  styleUrls: ['./answer-create.component.scss']
})
export class AnswerCreateComponent implements OnInit {
  answer: NewAnswer = {
    bug_id: '',
    posted_by: '',
    content: ''
  };

  constructor(
    private answerService: AnswerService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

}
