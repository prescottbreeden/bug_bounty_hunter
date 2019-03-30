export interface IUser{
  user_id: number;
  faction_name: string;
  first_name: string;
  last_name: string;
  email: string;
  admin: boolean;
  profile_img: string;
  konami_unlock: boolean;
  created_at: string | Date;
  updated_at: string | Date;
}

export class User implements IUser {
  user_id = 0;
  faction_name = '';
  first_name = '';
  last_name = '';
  email = '';
  admin = false;
  profile_img = '';
  konami_unlock = false;
  created_at = '';
  updated_at = '';
}

export interface IUserStats {
  bugs_posted: number;
  answers_posted: number;
  favorites: number;
}

export interface INewUser {
  first_name: string;
  last_name: string;
  faction_id: number;
  email: string;
  password: string;
  admin: boolean;
  profile_img: string;
}

export class NewUser implements INewUser {
  first_name = '';
  last_name = '';
  faction_id = 0;
  email = '';
  password = '';
  admin = false;
  profile_img: '';
}

export interface IUserToken {
  currentUser: IUser;
}

export function MapUserData(data: User): User {
  return data;
}

export function MapUserStatsData(data): IUserStats {
  return {
    bugs_posted: parseInt(data[0]['bugs']),
    answers_posted: parseInt(data[0]['answers']),
    favorites: parseInt(data[0]['favorites'])
  };
}
