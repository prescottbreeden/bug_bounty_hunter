import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/common/services/user.service';
import { AuthService } from '../common/services/auth.service';
import { Router } from '@angular/router';
import { NewUser } from '../common/models/User';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserValidators } from '../common/models/Validations';
import { uniqueEmailValidator } from '../common/unique-email-validator.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  showEmailField = true;
  showPasswordField = false;
  isRegistered = false;
  emailForm: FormGroup;
  passwordForm: FormGroup;
  newUserForm: FormGroup;

  user: NewUser = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createEmailForm();
  }

  createEmailForm() {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  createPasswordForm() {
    this.passwordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  createNewUserForm() {
    this.newUserForm = this.fb.group({
      first_name: ['',
        [Validators.required,
        Validators.minLength(2),
        UserValidators.cannotContainSpace]
      ],
      last_name: ['',
        [Validators.required,
        Validators.minLength(2),
        UserValidators.cannotContainSpace]
      ],
      email: ['',
        [Validators.required, Validators.email],
        [uniqueEmailValidator(this.userService)]
      ],
      password: ['', [Validators.required]],
      confirm: ['', [Validators.required]]
    })
  }


  get LogEmail() {
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
  get RegEmail() {
    return this.newUserForm.get('email');
  }
  get RegPassword() {
    return this.newUserForm.get('password');
  }

  onEmail() {
    if (this.emailForm.valid) {
      this.user.email = this.emailForm.value.email;
      this.authService.emailExists(this.emailForm.value)
        .subscribe(result => {
          if (result) {
            this.user.first_name = result.first_name;
            this.user.last_name = result.last_name;
            this.isRegistered = true;
            this.createPasswordForm();
            this.passwordForm.get('email').setValue(this.user.email);
          } else {
            this.createNewUserForm();
            this.newUserForm.get('email').setValue(this.user.email);
          }
          this.togglePasswordField();
          this.toggleEmailField();
        });
    } else {
      this.LogEmail.setErrors({
        invalidEmail: true
      })
    }
  }

  onPassword() {
    if (this.passwordForm.valid) {
      this.authService.login(this.passwordForm.value)
        .subscribe(result => {
          if (result) {
            this.router.navigate(['/bugs']);
          }
          else {
            this.LogPassword.setErrors({
              incorrectPassword: true
            });
          }
        });
    } else {
      this.LogPassword.setErrors({
        required: true
      });
    }
  }

  onRegister() {
    const {first_name, last_name, email, password} = this.newUserForm.value;
    this.user = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password
    }
    if (this.newUserForm.value.confirm != this.user.password) {
      this.RegPassword.setErrors({
        passwordsDoNotMatch: true
      })
    } else {
    this.authService.emailExists(this.user.email).subscribe(result => {
        if (result) {
          this.RegEmail.setErrors({
            alreadyExists: true
          });
        } else {
          this.userService.createNewUser(this.user).subscribe(() => {
            this.authService.login(this.user).subscribe(result => {
              if (result) {
                this.router.navigate(['/bugs']);
              } else {
                console.log('ALL IS LOST!!!')
                this.router.navigate(['/404']);
              }
            });
          });
        }
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
