import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NewUser } from '../models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: NewUser = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  };
  confirmPassword: '';
  invalidLogin = false;
  isRegistered = false;
  showEmailField = true;
  showPasswordField = false;

  constructor(
    private authService: AuthService,
    private api: HttpService,
    private router: Router
  ) { }

  ngOnInit() { 
    this.api.getBugs();
    this.api.getUsers();
  }

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
      if (this.confirmPassword != this.user.password) {
        return this.invalidLogin = true;
      }
      this.api.createNewUser(this.user)
        .subscribe(() => {
          this.authService.login(this.user)
            .subscribe(result => {
              if (result) {
                this.router.navigate(['/bugs']);
              } else {
                this.invalidLogin = true;
              }
            })
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
