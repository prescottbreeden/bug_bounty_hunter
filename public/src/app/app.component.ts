import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  users: any = [];

  constructor(private _http: HttpService) { }

  ngOnInit() {
    this._http.getUsers().subscribe(data => {
      this.users = data;
      console.log(this.users);
    });
  }
}
