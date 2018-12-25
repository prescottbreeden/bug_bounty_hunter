import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Bug, BugModel } from '../models/Bug';
import { HttpService } from 'src/app/http.service';

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
    private api: HttpService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.api.getOneBug(params['id'])
        .subscribe(results => {
          this.bug = BugModel(results[0]);
        });
    });
  }

  goHome() {
    this.router.navigate(['/bugs']);
  }

}
