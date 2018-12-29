import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/users/services/user.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NewUser } from '../models/User';
import { BugService } from 'src/app/bugs/services/bug.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  email_reg = '/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/'
  errors: object[];
  user: NewUser = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  };
  confirmPassword: '';
  badPassword = false;
  isRegistered = false;
  showEmailField = true;
  showPasswordField = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private bugService: BugService,
    private router: Router
  ) { }

  ngOnInit() { 
    this.bugService.getBugs();
    this.userService.getUsers();
  }

  onEmail() {
    if (this.user.email.length && this.user.email.match(this.email_reg)) {
      this.authService.isUnique(this.user)
        .subscribe(result => {
          if (result) {
            this.user.first_name = result.first_name;
            this.user.last_name = result.last_name;
            this.isRegistered = true;
          }
          this.togglePasswordField();
          this.toggleEmailField();
        });
    }
  }

  onPassword() {
    if (this.isRegistered) {
      this.authService.login(this.user)
        .subscribe(result => {
          if (result) {
            this.router.navigate(['/bugs']);
          } else {
            this.badPassword = true;
          }
        });
    } else {
      if (this.confirmPassword != this.user.password) {
        return this.badPassword = true;
      }
      this.userService.createNewUser(this.user)
        .subscribe(() => {
          this.authService.login(this.user)
            .subscribe(result => {
              if (result) {
                this.router.navigate(['/bugs']);
              } else {
                this.badPassword = true;
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

  ValidateUser() {
    if (this.user.first_name.length < 2) {
      this.errors.push({
        type: 'first_name',
        message: 'First name must be at least 2 characters long.',
      });
    }
    if (this.user.last_name.length < 2) {
      this.errors.push({
        type: 'last_name',
        message: 'Last name must be at least 2 characters long.',
      });
    }
    if (!this.user.email) {
      this.errors.push({
        type: 'email',
        message: 'Email cannot be blank',
      });
    } else {
      if(!this.user.email.match(this.email_reg)) {
        this.errors.push({
          type: 'email',
          message: 'Passwords do not match',
        });
      }
    }

    if (this.user.first_name.length < 2) {
      this.errors.push({
        type: 'first_name',
        message: 'First name must be at least 2 characters long.',
      })
    }
  } 
}
