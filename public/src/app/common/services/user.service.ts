import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/common/models/user/User';
import { NewUser } from "src/app/common/models/user/NewUser";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get('/api/users');
  }
  getById(user_id: number) {
    return this.http.get('/api/users/' + user_id);
  }
  getUserByEmail(email: string) {
    return this.http.post('/api/auth/email', {email: email});
  }
  createNewUser(newUser: NewUser) {
    return this.http.post('/api/users', newUser);
  }
  updateUser(user: User) {
    return this.http.post('/api/users/' + user.user_id, user);
  }
  deleteUser(user_id: number) {
    return this.http.delete('/api/users/' + user_id);
  }


  getUserStatsById(user_id: string | number) {
    return this.http.get('/api/users/stats/' + user_id);
  }
  getFactionStats(faction_id: number) {
    return this.http.get('/api/factions/stats/' + faction_id);
  }


  setProfilePic(data) {
    return this.http.put('/api/users/profile/' + data.user_id, data);
  }
  setKonami(user: User) {
    return this.http.post('/api/users/konami-unlock', user);
  }
}
