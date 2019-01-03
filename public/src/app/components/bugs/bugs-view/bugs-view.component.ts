import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from 'src/app/common/services/auth.service';
import { BugService } from 'src/app/common/services/bug.service';
import { BugModel } from 'src/app/common/models/Bug';
import { NewAnswer, AnswerModel, MapAnswerDatum } from 'src/app/common/models/Answer';
import { buildBugObject } from 'src/app/common/models/Helpers';
import { UserToken, UserModel } from 'src/app/common/models/User';

@Component({
  selector: 'app-bugs-view',
  templateUrl: './bugs-view.component.html',
})
export class BugsViewComponent implements OnInit {
  token: UserToken;
  user: UserModel;
  userLikes: Boolean = false;
  showAnswerForm: Boolean = false;

  bug: BugModel = {
    bug_id: '',
    posted_by: '',
    error: '',
    traceback: '',
    message: '',
    view_count: '',
    bug_created: '',
    bug_updated: '',
    num_answers: '',
    num_likes: ''
  };

  answers: AnswerModel[] = [
    { 
      answer_id: '',
      bug_id: '',
      answered_by: '',
      answer_content: '',
      answer_created: '',
      answer_updated: '',
    }
  ];

  newAnswer: NewAnswer = {
    bug_id: '',
    answered_by: '',
    answer_content: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bugService: BugService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.token = this.authService.getToken();
    if (!this.token) {
      this.authService.logout();
      this.router.navigate(['/']);
    } else {
      this.user = this.token.currentUser;
      this.route.params.subscribe((params: Params) => {
        this.bug.bug_id = params['id'];
        this.bugService.getLikes(this.bug.bug_id, this.user.user_id)
          .subscribe(res => {
            if(res[0] && res[0].hasOwnProperty('user_id')) {
              this.userLikes = true;
            }
          })
        this.bugService.getBugById(this.bug.bug_id)
          .subscribe(res => {
            const DATA = buildBugObject(res);
            this.bug = DATA.bug;
            this.answers = DATA.answers;
            this.newAnswer.answered_by = this.user.user_id;
            this.newAnswer.bug_id = this.bug.bug_id;
          });
      });
    }
  }
  
  onSubmitAnswer() {
    this.newAnswer.answer_content = JSON.stringify(this.newAnswer.answer_content);
    this.bugService.addAnswer(this.newAnswer).subscribe(res => {
      this.bugService.getAnswer(res['insertId'])
        .subscribe(res => {
          let addedAnswer = MapAnswerDatum(res[0]);
          addedAnswer.answer_content = JSON.parse(addedAnswer.answer_content);
          addedAnswer.answered_by = this.user.first_name + ' ' + this.user.last_name;
          this.answers = [ ...this.answers, addedAnswer];
        })
    });
    this.newAnswer.answer_content = '';
    this.toggleForm();
  }

  toggleForm() {
    this.showAnswerForm = !this.showAnswerForm;
  }

  likeBug() {
    this.bugService.likeBug({
      bug_id: this.bug.bug_id,
      user_id: this.user.user_id
    }).subscribe(res => {
      this.userLikes = true;
    })
  }

}

