import { Directive } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/common/services/user.service';
import { map } from 'rxjs/operators';

export function uniqueEmailValidator(userService: UserService): AsyncValidatorFn {
  return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    console.log('fack you async validator: ', c, c.value);
    return userService.getUserByEmail(c.value).pipe(
      map(users => {
        console.log(users);
        if (users instanceof Array)
          return users && users.length > 0 ? { alreadyExists: true } : null;
        return null;
      })
    )
  }
}

@Directive({
  selector: '[UniqueEmail]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: UniqueEmailValidatorDirective, multi: true }]
})
export class UniqueEmailValidatorDirective implements AsyncValidator {

  constructor(private userService: UserService) { }

  validate(c: AbstractControl)
    : Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

      return uniqueEmailValidator(this.userService)(c);
  }

}
