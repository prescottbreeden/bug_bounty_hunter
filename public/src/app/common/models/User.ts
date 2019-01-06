export interface UserModel {
  user_id: string;
  faction_name: string;
  first_name: string;
  last_name: string;
  email: string;
  admin: boolean;
  profile_img: string;
  created_at: string | Date;
  updated_at: string | Date;
}

export interface UserStats {
  bugs_posted: number;
  answers_posted: number;
  favorites: number;
  konami_unlock: boolean;
}

export interface NewUser {
  first_name: string;
  last_name: string;
  faction_id: string;
  email: string;
  password: string;
  admin: boolean;
  profile_img: string;
}

export interface UserToken {
  currentUser: UserModel;
}

export function MapUserData(data): UserModel {
  return {
    user_id: data['user_id'],
    faction_name: data['faction_name'],
    first_name: data['first_name'],
    last_name: data['last_name'],
    email: data['email'],
    admin: data['admin'],
    profile_img: data['profile_img'],
    created_at: data['user_created'],
    updated_at: data['user_updated']
  }
}

export function MapUserStatsData(data): UserStats {
  return {
    bugs_posted: parseInt(data['bugs']),
    answers_posted: parseInt(data['answers']),
    favorites: parseInt(data['favorites']),
    konami_unlock: data['konami_unlock']
  }
}
