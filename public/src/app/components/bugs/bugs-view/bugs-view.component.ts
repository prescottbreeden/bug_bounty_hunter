import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from 'src/app/common/services/auth.service';
import { BugService } from 'src/app/common/services/bug.service';
import { BugModel } from 'src/app/common/models/Bug';
import { NewAnswer, AnswerModel, MapAnswerDatum, NewAnswerErrors, ValidateNewAnswer } from 'src/app/common/models/Answer';
import { buildBugObject } from 'src/app/common/models/Helpers';
import { UserModel, MapUserData } from 'src/app/common/models/User';
import { isNull } from 'util';

@Component({
  selector: 'app-bugs-view',
  templateUrl: './bugs-view.component.html',
})
export class BugsViewComponent implements OnInit {
  user: UserModel;
  isFavorite: Boolean = false;
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

  formErrors: NewAnswerErrors = {
    ContentField: null
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bugService: BugService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const token = this.authService.getToken();
    if (isNull(token)) {
      return this.router.navigate(['/']);
    }
    this.user = MapUserData(token.currentUser);
    this.route.params.subscribe((params: Params) => {
      this.bug.bug_id = params['id'];
      this.getLikedStatus();
      this.getBugData();
    });
  }
  
  onSubmitAnswer() {
    this.formErrors = ValidateNewAnswer(this.newAnswer);
    if (this.formErrors.ContentField === null) {
      this.createAnswer();
    }
  }

  createAnswer() {
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

  getLikedStatus() {
    this.bugService.isFavorite({
      bug_id: this.bug.bug_id, 
      user_id: this.user.user_id
    }).subscribe(res => {
        if(res[0] && res[0].hasOwnProperty('user_id')) {
          this.isFavorite = true;
        }
      });
  }

  getBugData() {
    this.bugService.getBugById(this.bug.bug_id)
      .subscribe(res => {
        const DATA = buildBugObject(res);
        this.bug = DATA.bug;
        this.answers = DATA.answers;
        this.newAnswer.answered_by = this.user.user_id;
        this.newAnswer.bug_id = this.bug.bug_id;
      });
  }

  likeBug() {
    this.bugService.addFavorite({
      bug_id: this.bug.bug_id,
      user_id: this.user.user_id
    }).subscribe(res => {
      this.isFavorite = true;
    })
  }

  dislikeBug() {
    this.bugService.removeFavorite({
      bug_id: this.bug.bug_id,
      user_id: this.user.user_id
    }).subscribe(res => {
      this.isFavorite = false;
    })
  }
}

