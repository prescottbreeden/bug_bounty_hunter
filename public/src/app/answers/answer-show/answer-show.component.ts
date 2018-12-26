import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/users/services/auth.service';
import { Router, Route, ActivatedRoute, Params } from '@angular/router';
import { AnswerService } from 'src/app/answers/services/answer.service';
import { BugModel, MapBugData } from 'src/app/bugs/models/Bug';
import { BugService } from 'src/app/bugs/services/bug.service';
import { AnswerModel, MapAnswerData } from 'src/app/answers/models/Answer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-answer-show',
  templateUrl: './answer-show.component.html',
  styleUrls: ['./answer-show.component.scss']
})
export class AnswerShowComponent implements OnInit {
  bug: any;
  answers: AnswerModel[];

  constructor(
    private authService: AuthService,
    private answerService: AnswerService,
    private bugService: BugService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.bugService.getBugById(params['id'])
        .subscribe(results => {
          this.bug = MapBugData(results[0]);
          this.answerService.getAnswerWithId(this.bug.bug_id)
            .pipe(map(result => {
              const answer = MapAnswerData(result);
              this.answers.push(answer);
            }))
            .subscribe(results => {
              // this.answers = convertData(results);
              
            })
          });
          // console.log(typeof(this.bug.bug_id));

    })
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
