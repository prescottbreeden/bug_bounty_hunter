import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel, NewUser } from 'src/app/common/models/User';

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
    return this.http.post('/authservice/validate/email/', {email: email});
  }
  createNewUser(newUser: NewUser) { 
    return this.http.post('/api/users', newUser); 
  }
  updateUser(user: UserModel) {
    return this.http.post('/api/users/' + user.user_id, user);
  }
  deleteUser(user_id: number) {
    return this.http.delete('/api/users/' + user_id);
  }
  getUserStatsById(user_id: string | number) {
    return this.http.get('/api/users/stats/' + user_id);
  }
  getAllUserStats() {
    return this.http.get('/api/users/stats/');
  }
  getFactionStats(faction_id: number) {
    return this.http.get('/api/factions/' + faction_id);
  }
}
