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
    this.token = this.authService.getToken();
  }
}
