import { AbstractControl, ValidationErrors } from '@angular/forms';

export interface UserModel {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  admin: boolean;
  created_at: string | Date;
  updated_at: string | Date;
}

export interface NewUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface UserToken {
  currentUser: UserModel;
}

export function MapUserData(data): UserModel {
  return {
    user_id: data['user_id'],
    first_name: data['first_name'],
    last_name: data['last_name'],
    email: data['email'],
    admin: data['admin'],
    created_at: data['created_at'],
    updated_at: data['updated_at']
  }
}

export class UserValidators {
  static cannotContainSpace(control : AbstractControl) : ValidationErrors | null {
    if ((control.value as string).indexOf(' ') >=0) {
      return { cannotcontainspace: true }
    }
    return null;
  }
  customLength(control: AbstractControl) : ValidationErrors | null {
    if ((control.value as string).length == 0) {
      return {
        customLength: {
          requiredLength: 10,
          actualLength: control.value.length
        }
      }
    }
    return null;
  }
}