import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel, NewUser } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers() { 
    return this.http.get('/api/users'); 
  }
  getById(id: number) { 
    return this.http.get('/api/users/' + id); 
  }
  createNewUser(newUser: NewUser) { 
    return this.http.post('/api/users', newUser); 
  }
  updateUser(user: UserModel) {
    return this.http.post('/api/users/' + user.user_id, user);
  }
  deleteUser(id: number) {
    return this.http.delete('/api/users/' + id);
  }
}
