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
}
