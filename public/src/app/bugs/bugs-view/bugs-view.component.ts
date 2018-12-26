import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Bug, MapBugData } from '../models/Bug';
import { BugService } from 'src/app/bugs/services/bug.service';

@Component({
  selector: 'app-bugs-view',
  templateUrl: './bugs-view.component.html',
  styleUrls: ['./bugs-view.component.scss']
})
export class BugsViewComponent implements OnInit {
  bug: Bug = {
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
    private bugService: BugService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.bugService.getBugById(params['id'])
        .subscribe(results => {
          this.bug = MapBugData(results[0]);
        });
    });
  }

  goHome() {
    this.router.navigate(['/bugs']);
  }

}
