import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from 'src/app/common/services/auth.service';
import { BugService } from 'src/app/common/services/bug.service';
import { BugModel, MapBugData, MapBugDatum } from 'src/app/common/models/Bug';
import { NewAnswer, MapAnswerData, AnswerModel, MapAnswerDatum } from 'src/app/common/models/Answer';
import { jsonDecode, jsonEncode, buildBugObject } from 'src/app/common/models/Helpers';

@Component({
  selector: 'app-bugs-view',
  templateUrl: './bugs-view.component.html',
})
export class BugsViewComponent implements OnInit {
  userLikes: Boolean = false;
  showAnswerForm: Boolean = false;
  userId: string = '';

  bug: BugModel = {
    bug_id: '',
    posted_by: '',
    error: '',
    traceback: '',
    message: '',
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
      user_likes: false
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
    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/']);
    } else {
      this.userId = token.currentUser.user_id;
      this.route.params.subscribe((params: Params) => {
        this.bug.bug_id = params['id'];
        this.bugService.getLikes(this.bug.bug_id, this.userId)
          .subscribe(res => {
            if(res[0].hasOwnProperty('user_id')) this.userLikes = true;
          })
        this.bugService.getBugById(this.bug.bug_id)
          .subscribe(res => {
            const DATA = buildBugObject(res);
            this.bug = DATA.bug;
            this.answers = DATA.answers;
            this.answers.forEach(ele => {
              this.bugService.answerIsLiked(ele.answer_id, this.userId)
                .subscribe(res => {
                  ele.user_likes = res;
                });
            });

            this.newAnswer.answered_by = this.userId;
            this.newAnswer.bug_id = this.bug.bug_id;
          });
      });
    }
  }
  
  onSubmitAnswer() {
    this.newAnswer.answer_content = jsonEncode(this.newAnswer.answer_content);
    this.bugService.addAnswer(this.newAnswer).subscribe(res => {
      this.bugService.getAnswer(res['insertId'])
        .subscribe(res => {
          let addedAnswer = MapAnswerDatum(res[0]);
          addedAnswer.answer_content = jsonDecode(addedAnswer.answer_content);
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
      user_id: this.userId
    }).subscribe(res => {
      this.userLikes = true;
    })
  }

}

