import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { BugModel, MapBugData } from '../models/Bug';
import { BugService } from 'src/app/bugs/services/bug.service';

@Component({
  selector: 'app-bugs-view',
  templateUrl: './bugs-view.component.html',
  styleUrls: ['./bugs-view.component.scss']
})
export class BugsViewComponent implements OnInit {
  @Output() UpdateBugId = new EventEmitter<BugModel>();

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
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.bugService.getBugById(params['id'])
        .subscribe(results => {
          this.bug = MapBugData(results[0]);
          });
          // console.log(typeof(this.bug.bug_id));
    });
  }

  goHome() {
    this.router.navigate(['/bugs']);
  }

}

