import { Component, OnInit } from '@angular/core';
import { AuthService } from './users/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  token: object;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.tokenEmitted$.subscribe(token => {
      this.token = token;
      console.log('app component: token recieved');
    })
  }

}
