import { Component, OnInit } from '@angular/core';
import { NewBug } from '../models/NewBug';
import { AuthService } from 'src/app/users/auth.service';
import { HttpService } from 'src/app/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bugs-create',
  templateUrl: './bugs-create.component.html',
  styleUrls: ['./bugs-create.component.scss']
})
export class BugsCreateComponent implements OnInit {
  token: any | null;
  newBug: NewBug = {
    user_id: '',
    title: '',
    traceback: ''
  };

  constructor(
    private authService: AuthService,
    private httpService: HttpService,
    private router: Router
  ) { }

  ngOnInit() {
    this.token = this.authService.getToken()
    if (this.token) {
      this.newBug.user_id = this.token.currentUser.user_id;
    }
  }

  onSubmitBug() {
    console.log(this.newBug);
    this.httpService.createBug(this.newBug);
    this.router.navigate(['/bugs']);
  }

}
