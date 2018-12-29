import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from 'src/app/common/services/auth.service';
import { BugService } from 'src/app/common/services/bug.service';
import { BugModel, MapBugData, MapBugDatum } from '../../common/models/Bug';
import { NewAnswer, MapAnswerData, AnswerModel, MapAnswerDatum } from 'src/app/common/models/Answer';

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
    error: '',
    traceback: '',
    bug_created: '',
    bug_updated: ''
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
          .subscribe(res => {
            this.bug = MapBugDatum(res[0]);
            this.answers = MapAnswerData(res);
            this.newAnswer.answered_by = token.currentUser.user_id;
            this.newAnswer.bug_id = this.bug.bug_id;
          });
      });
    }
  }
  
  onSubmitAnswer() {
    this.bugService.addAnswer(this.newAnswer).subscribe(res => {
      console.log(res['insertId']);
      this.bugService.getAnswer(res['insertId'])
        .subscribe(res => {
          this.answers = [ ...this.answers, MapAnswerDatum(res[0])];
          console.log(this.answers);
        })
    });
    this.newAnswer.answer_content = '';
  }

}

