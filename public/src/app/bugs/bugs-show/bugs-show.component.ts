import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/users/auth.service';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-bugs-show',
  templateUrl: './bugs-show.component.html',
  styleUrls: ['./bugs-show.component.scss']
})
export class BugsShowComponent implements OnInit {
  bugs: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    const token = this.authService.getToken();
    console.log('Current user: ', token);
    if (!token) {
      this.authService.logout();
      this.router.navigate(['/']);
    } else {
      this.bugs = this.httpService.getBugs();
      console.log(this.bugs);
    }
  }

  onSubmitBug() {

  }

}
