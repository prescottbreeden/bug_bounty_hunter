import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from 'src/app/common/services/auth.service';
import { BugService } from 'src/app/common/services/bug.service';
import { BugModel, NewBugErrors, ValidateNewBug, MapBugData } from 'src/app/common/models/Bug';
import { NewAnswer, AnswerModel, MapAnswerDatum, NewAnswerErrors, ValidateNewAnswer } from 'src/app/common/models/Answer';
import { buildBugObject } from 'src/app/common/models/Helpers';
import { UserModel, MapUserData } from 'src/app/common/models/User';
import { isNull } from 'util';

@Component({
  selector: 'app-bugs-view',
  templateUrl: './bugs-view.component.html',
})
export class BugsViewComponent implements OnInit {
  isFavorite: Boolean = false;
  showEditBugForm: boolean = false;
  showAnswerForm: boolean = false;
  editAnswer: boolean = false;

  user: UserModel;

  bug: BugModel = {
    bug_id: 0,
    posted_by: 0,
    posted_name: '',
    posted_profile: '',
    error: '',
    traceback: '',
    message: '',
    view_count: 0,
    bug_created: '',
    bug_updated: '',
    num_answers: 0,
  };

  editBug: BugModel;

  answers: AnswerModel[] = [
    { 
      answer_id: 0,
      bug_id: 0,
      answered_by: 0,
      answered_name: '',
      answer_profile: '',
      answer_content: '',
      accepted: false,
      answer_created: '',
      answer_updated: '',
    }
  ];

  newAnswer: NewAnswer = {
    bug_id: 0,
    answered_by: 0,
    answer_content: ''
  };

  updatedAnswer: AnswerModel;

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
      this.bug.bug_id = parseInt(params['id']);
      this.getLikedStatus();
      this.getBugData();
    });
  }
  
  // -------------------------------------------- //
  //              HTML EVENT LISTENERS            //
  // -------------------------------------------- //
  onSubmitAnswer() {
    this.answerFormErrors = ValidateNewAnswer(this.newAnswer);
    if (this.answerFormErrors.ContentField === null) {
      return this.createAnswer();
    }
  }
  onSubmitAnswerEdit() {
    this.answerFormErrors = ValidateNewAnswer(this.updatedAnswer);
    if (this.answerFormErrors.ContentField === null) {
      return this.updateAnswer();
    }
  }
  onSubmitBugEdit() {
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
  onEditAnswer(answer_id) {
    this.updatedAnswer = this.answers.filter(ele => {
      return ele.answer_id === answer_id;
    })[0];
    this.toggleForm();
    this.editAnswer = true;
  }
  onAcceptAnswer(answer_id) {
    const answer = this.answers.filter(ele => {
      return ele.answer_id === answer_id;
    })[0];
    if (this.bug.posted_by != this.user.user_id) {
      if (!this.user.admin) {
        return alert('Me not that kind of orc.');
      }
    }
    answer.accepted = !answer.accepted;
    this.bugService.acceptAnswer(answer_id, answer)
      .subscribe(result => {
        console.log(result);
      });
  }


  // -------------------------------------------- //
  //              toggle form methods             //
  // -------------------------------------------- //
  toggleForm() {
    if (this.editAnswer) {
      this.editAnswer = false;
    }
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


  // -------------------------------------------- //
  //              BUG API METHODS                 //
  // -------------------------------------------- //
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
  createAnswer() {
    this.newAnswer.answer_content = JSON.stringify(this.newAnswer.answer_content);
    this.bugService.addAnswer(this.newAnswer).subscribe(res => {
      this.bugService.getAnswer(res['insertId'])
        .subscribe(res => {
          let addedAnswer = MapAnswerDatum(res[0]);
          addedAnswer.answer_content = JSON.parse(addedAnswer.answer_content);
          addedAnswer.answered_name = this.user.first_name + ' ' + this.user.last_name;
          addedAnswer.answer_profile = this.user.profile_img;
          this.answers = [ ...this.answers, addedAnswer];
        })
    });
    this.newAnswer.answer_content = '';
    this.toggleForm();
  }
  updateAnswer() {
    this.updatedAnswer.answer_content = JSON.stringify(this.updatedAnswer.answer_content);
    this.bugService.updateAnswer(this.updatedAnswer)
      .subscribe(res => {
        console.log(res);
      });
    this.toggleForm();
    this.editAnswer = false;
    this.updatedAnswer.answer_content = JSON.parse(this.updatedAnswer.answer_content);
  }
}

