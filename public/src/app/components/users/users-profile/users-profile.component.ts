import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/common/services/auth.service';
import { UserService } from 'src/app/common/services/user.service';
import { UserModel, MapUserData, UserStats, MapUserStatsData } from 'src/app/common/models/User';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
})
export class UsersProfileComponent implements OnInit {
  user: UserModel = {
    user_id: '',
    first_name: '',
    last_name: '',
    email: '',
    created_at: '',
    updated_at: '',
    admin: false
  };
  stats: UserStats = {
    bugs_posted: '',
    answers_posted: '',
    bugs_liked: '',
    answers_liked: ''
  };

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    const token = this.authService.getToken()
    this.user = MapUserData(token.currentUser);
    this.userService.getUserStatsById(this.user.user_id)
      .subscribe(result => {
        this.stats = MapUserStatsData(result[0]);
      });
  }

}
