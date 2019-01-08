import { Component, OnInit, HostListener } from '@angular/core';
import { UserService } from 'src/app/common/services/user.service';
import { AuthService } from 'src/app/common/services/auth.service';
import { Router } from '@angular/router';
import { NewUser } from 'src/app/common/models/User';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserValidators } from 'src/app/common/models/Validations';
import { uniqueEmailValidator } from 'src/app/common/directives/unique-email-validator.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  key: number;
  code: number[] = [84,72,69,82,69,73,83,78,79,67,79,87,76,69,86,69,76];
  index: number = 0;
  admin: boolean = false;
  showEmailField = true;
  showPasswordField = false;
  isRegistered = false;
  emailForm: FormGroup;
  passwordForm: FormGroup;
  newUserForm: FormGroup;
  profile_pics = {
    1: "assets/img/images/profile-11.png",
    2: "assets/img/images/profile-12.png",
    3: "assets/img/images/profile-9.png",
    4: "assets/img/images/solo.png",
    5: "assets/img/images/leia.png"
  }

  user: NewUser = {
    first_name: '',
    last_name: '',
    faction_id: 0,
    email: '',
    password: '',
    admin: this.admin,
    profile_img: ''
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
      faction_id: ['',
        [Validators.required]
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
  get Faction() {
    return this.newUserForm.get('faction_id');
  }
  get RegEmail() {
    return this.newUserForm.get('email');
  }
  get RegPassword() {
    return this.newUserForm.get('password');
  }
  get Confirm() {
    return this.newUserForm.get('confirm');
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
    const {first_name, last_name, faction_id, email, password} = this.newUserForm.value;
    const profile_img = this.profile_pics[faction_id];
    this.user = {
      first_name: first_name,
      last_name: last_name,
      faction_id: faction_id,
      email: email,
      password: password,
      admin: this.admin,
      profile_img: profile_img
    }
    if (this.newUserForm.value.confirm != this.user.password) {
      this.Confirm.setErrors({
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

  @HostListener('document: keydown', ['$event'])
  adminActive(event: KeyboardEvent) {
    this.key = event.keyCode;
    if (this.key == this.code[this.index]) {
      if (this.index === this.code.length-1) {
        this.admin = true;
        console.log('Admin active');
      } 
      return this.index++;
    }
    return this.index = 0;
  }
}
