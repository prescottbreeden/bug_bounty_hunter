import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from 'src/app/common/services/auth.service';
import { BugService } from 'src/app/common/services/bug.service';
import { BugModel, NewBugErrors, ValidateNewBug, MapBugData } from 'src/app/common/models/Bug';
import { NewAnswer, AnswerModel, MapAnswerDatum, NewAnswerErrors, ValidateNewAnswer } from 'src/app/common/models/Answer';
import { buildBugObject } from 'src/app/common/models/Helpers';
import { UserModel, MapUserData } from 'src/app/common/models/User';
import { isNull } from 'util';
import { BuiltinFunctionCall } from '@angular/compiler/src/compiler_util/expression_converter';

@Component({
  selector: 'app-bugs-view',
  templateUrl: './bugs-view.component.html',
})
export class BugsViewComponent implements OnInit {
  user: UserModel;
  isFavorite: Boolean = false;
  showAnswerForm: Boolean = false;
  showEditBugForm: Boolean = false;

  bug: BugModel = {
    bug_id: '',
    posted_by: '',
    posted_name: '',
    error: '',
    traceback: '',
    message: '',
    view_count: '',
    bug_created: '',
    bug_updated: '',
    num_answers: '',
  };

  editBug: BugModel;

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

  answerFormErrors: NewAnswerErrors = {
    ContentField: null
  }

  editFormErrors: NewBugErrors = {
    ErrorField: null,
    TracebackField: null,
    MessageField: null
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
    this.answerFormErrors = ValidateNewAnswer(this.newAnswer);
    if (this.answerFormErrors.ContentField === null) {
      this.createAnswer();
    }
  }
  onEditBug() {
    this.editFormErrors = ValidateNewBug(this.editBug);
    if (this.editFormErrors.ErrorField === null 
      && this.editFormErrors.MessageField === null 
      && this.editFormErrors.TracebackField === null) {
      this.editBug.traceback = JSON.stringify(this.editBug.traceback);
      this.editBug.message = JSON.stringify(this.editBug.message);
      this.bugService.updateBug(this.editBug)
        .subscribe(res => {
          console.log('bug updated: ', res);
        });
      this.toggleEdit();
      this.router.navigate(['/bugs/' + this.bug.bug_id]);
      this.getBugData();
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
    if (this.showEditBugForm) {
      this.toggleEdit();
    }
    this.showAnswerForm = !this.showAnswerForm;
  }
  toggleEdit() {
    if (this.showAnswerForm) {
      this.toggleForm();
    }
    this.showEditBugForm = !this.showEditBugForm;
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
        this.editBug = { ...this.bug };
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

