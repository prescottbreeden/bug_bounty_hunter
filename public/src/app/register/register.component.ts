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
    this._http
      .getByEmail(this.user.email)
      .subscribe(res => {
        console.log('test', res);
        if (res.toString().length > 0) {
          this.isRegistered = true;
          this.loginPassword = res['password'];
        }
      });

    this.showPasswordField = true;
    this.showEmailField = false;
  }

  onPassword() {
    if (this.isRegistered) {
      this._http.validate(this.user).subscribe(data => {
        console.log(data);
        this._router.navigate(['/bugs']);
      });
    } else {
      this._http.createUser(this.user).subscribe(data => {
        console.log(data);
        this._router.navigate(['/bugs']);
      });
    }
  }

}
