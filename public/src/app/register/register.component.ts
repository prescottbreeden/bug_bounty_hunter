import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { AuthService } from '../auth.service';
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
  invalidLogin = false;
  isRegistered = false;
  showEmailField = true;
  showPasswordField = false;

  constructor(
    private authService: AuthService,
    private userApi: HttpService,
    private router: Router
  ) { }

  ngOnInit() { }

  onEmail() {
    this.authService.isUnique(this.user)
      .subscribe(result => {
        if (result) {
          this.isRegistered = true;
        }
        this.togglePasswordField();
        this.toggleEmailField();
      });
  }

  onPassword() {
    if (this.isRegistered) {
      this.authService.login(this.user)
        .subscribe(result => {
          if (result) {
            this.router.navigate(['/bugs']);
          } else {
            this.invalidLogin = true;
          }
        });
    } else {
      this.userApi.createNewUser(this.user)
        .subscribe(() => {
          this.router.navigate(['/bugs']);
        });
    }
  }

  togglePasswordField() {
    this.showPasswordField = !this.showPasswordField;
  }
  
  toggleEmailField() {
    this.showEmailField = !this.showEmailField;
  }
}
