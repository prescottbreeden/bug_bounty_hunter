import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from 'src/app/common/services/auth.service';
import { UserService } from 'src/app/common/services/user.service';
import { UserModel, MapUserData, UserStats, MapUserStatsData } from 'src/app/common/models/User';
import { isNull } from 'util';
import { Router } from '@angular/router';

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
    profile_img: '',
    created_at: '',
    updated_at: '',
    admin: false
  };
  stats: UserStats = {
    bugs_posted: '',
    answers_posted: '',
    favorites: '',
    konami_unlock: false
  };
  key: number;
  code: number[] = [38,38,40,40,37,39,37,39,66,65,13];
  index: number = 0;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    const token = this.authService.getToken()
    if (isNull(token)) {
      return this.router.navigate(['/']);
    }
    this.user = MapUserData(token.currentUser);
    this.userService.getUserStatsById(this.user.user_id)
      .subscribe(result => {
        this.stats = MapUserStatsData(result[0]);
        // this.konami_unlock = result[0]['konami_unlock'];
      });
  }

  @HostListener('document: keydown', ['$event'])
  checkKonami(event: KeyboardEvent) {
    this.key = event.keyCode;
    if (this.key == this.code[this.index]) {
      if (this.index === this.code.length-1) {
        this.stats.konami_unlock = true;
        this.user.profile_img = "assets/img/yoda.png";
      } 
      return this.index++;
    }
    return this.index = 0;
  }

}
