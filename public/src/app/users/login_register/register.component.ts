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

  passwordForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
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
      [
        Validators.required, 
        Validators.minLength(2),
        UserValidators.cannotContainSpace
      ]
    ),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  get Email() {
    return this.emailForm.get('email');
  }
  get LogPassword() {
    return this.passwordForm.get('password');
  }
  get FirstName() {
    return this.newUserForm.get('first_name');
  }
  get LastName() {
    return this.newUserForm.get('last_name');
  }
  get RegPassword() {
    return this.newUserForm.get('password');
  }

  user: NewUser = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  };
  confirmPassword: '';
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
      this.user.email = this.emailForm.value.email;
      this.authService.isUnique(this.emailForm.value)
        .subscribe(result => {
          if (result) {
            this.user.first_name = result.first_name;
            this.user.last_name = result.last_name;
            this.isRegistered = true;
          }
          this.togglePasswordField();
          this.toggleEmailField();
          console.log('user info: ', this.user);
        });
    } else {
      console.log('form sucks');
      this.emailForm.setErrors({
        invalidLogin: true
      })
    }
  }

  onRegister() {
    this.user = this.newUserForm.value;
    if (this.confirmPassword != this.user.password) {
      this.newUserForm.setErrors({
        invalidLogin: true
      });
      return 0;
    } 
    this.userService.createNewUser(this.user)
      .subscribe(() => {
        this.authService.login(this.user)
          .subscribe(result => {
            if (result) {
              this.router.navigate(['/bugs']);
            } else {
              this.newUserForm.setErrors({
                invalidLogin: true
              });
            }
          })
      });
  }

  onPassword() {
    console.log(this.user);
    this.authService.login(this.user)
      .subscribe(result => {
        if (result) {
          this.router.navigate(['/bugs']);
        } 
        else {
          console.log('password doesnt match');
          // this.passwordForm.setErrors({
          //   passwordNotMatch: true
          // })
        }
      });
} 

togglePasswordField() {
    this.showPasswordField = !this.showPasswordField;
  }
  
  toggleEmailField() {
    this.showEmailField = !this.showEmailField;
  }
}
