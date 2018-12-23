import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user = {
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  };
  loginPassword = '';
  isRegistered = false;
  showEmailField = true;
  showPasswordField = false;

  constructor(
    private _http: HttpService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  onEmail() {
    this._http.isUnique(this.user.email).subscribe(data => {
      if (data) {
        this.isRegistered = true;
        // this.loginPassword = res['password'];
      } else {
        console.log('falf');
      }
    });
    this.showPasswordField = true;
    this.showEmailField = false;
  }

  onPassword() {
    if (this.isRegistered) {
      this._http.login(this.user).subscribe(data => {
        this._router.navigate(['/bugs']);
      });
    } else {
      this._http.createUser(this.user).subscribe(data => {
        this._router.navigate(['/bugs']);
      });
    }
  }

}
