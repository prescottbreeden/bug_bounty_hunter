import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/common/services/user.service';
import { AuthService } from '../../common/services/auth.service';
import { Router } from '@angular/router';
import { NewUser, UserValidators } from '../../common/models/User';
import { BugService } from 'src/app/common/services/bug.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  emailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  newUserForm = new FormGroup({
    first_name: new FormControl('', 
      [
        Validators.required, 
        Validators.minLength(2), 
        UserValidators.cannotContainSpace
      ]
    ),
    last_name: new FormControl('', 
      [Validators.required, Validators.minLength(2)]
    ),
    password: new FormControl('', Validators.required)
  });

  get Email() {
    return this.emailForm.get('email');
  }
  get FirstName() {
    return this.newUserForm.get('first_name');
  }

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
    if (this.emailForm.valid) {
      this.authService.isUnique(this.emailForm.value)
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
}
