import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from 'src/app/users/services/auth.service';
import { BugService } from 'src/app/bugs/services/bug.service';
import { BugModel, MapBugData } from '../models/Bug';
import { NewAnswer, MapAnswerData, AnswerModel } from 'src/app/bugs/models/Answer';

@Component({
  selector: 'app-bugs-view',
  templateUrl: './bugs-view.component.html',
  styleUrls: ['./bugs-view.component.scss']
})
export class BugsViewComponent implements OnInit {

  answers: AnswerModel[];

  newAnswer: NewAnswer = {
    bug_id: '',
    answered_by: '',
    answer_content: ''
  };

  bug: BugModel = {
    bug_id: '',
    posted_by: '',
    title: '',
    traceback: '',
    created_at: '',
    updated_at: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bugService: BugService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/']);
    } else {
      this.route.params.subscribe((params: Params) => {
        this.bugService.getBugById(params['id'])
          .subscribe(results => {
            this.answers = MapAnswerData(results);
            this.bug = MapBugData(results[0]);
            this.newAnswer.answered_by = token.currentUser.user_id;
            this.newAnswer.bug_id = this.bug.bug_id;
          });
      });
    }
  }
  
  onSubmitAnswer() {
    this.bugService.addAnswer(this.newAnswer).subscribe(res => {
      console.log(res);
    });
  }

}

