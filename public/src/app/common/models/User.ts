export interface UserModel {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  admin: boolean;
  created_at: string | Date;
  updated_at: string | Date;
}

export interface UserStats {
  bugs_posted: string | number;
  answers_posted: string | number;
  bugs_liked: string | number;
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
    created_at: data['user_created'],
    updated_at: data['user_updated']
  }
}

export function MapUserStatsData(data): UserStats {
  return {
    bugs_posted: data['bugs'],
    answers_posted: data['answers'],
    bugs_liked: data['blikes']
  }
}
