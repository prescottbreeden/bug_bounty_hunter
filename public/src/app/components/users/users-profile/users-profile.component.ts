import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from 'src/app/common/services/auth.service';
import { UserService } from 'src/app/common/services/user.service';
import { isNull } from 'util';
import { Router } from '@angular/router';
import { User } from 'src/app/common/models/user/User';
import { Rank } from 'src/app/common/models/user/Rank';
import { setTitle, setRank } from './setTitle';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
})
export class UsersProfileComponent implements OnInit {
  user = new User;
  rankData = new Rank;
  editProfilePicStatus = true;
  editNameStatus = false;
  editEmailStatus = false;
  askYoda = false;
  kesselCommander = false;
  konamiMaster = false;
  rank: number;
  key: number;
  code: number[] = [38,38,40,40,37,39,37,39,66,65,13];
  index: number = 0;

titles: any = {
  'Bug Hunter': 'assets/img/images/bobafett.png',
  'Master Bug Hunter': 'assets/img/images/windu.png',
  'Kessel Commander': 'assets/img/images/falcon.png',
  'Bug Vadar': 'assets/img/images/vader.png',
  'The Bug Star': 'assets/img/images/deathstar.png',
  'Grand Master': 'assets/img/images/yoda.png',
  'Hacker': 'assets/img/images/r2d2.png'
};


avatars: string[] = [
  'assets/img/images/bobafett.png',
  'assets/img/images/windu.png',
  'assets/img/images/vader.png',
  'assets/img/images/deathstar.png',
  'assets/img/images/falcon.png',
  'assets/img/images/r2d2.png',
  'assets/img/images/yoda.png'
 ]

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
    this.user = token.currentUser;
    this.user.rank = setRank(this.user);
    this.rankData = setTitle(this.user);
    this.konamiMaster = this.user.konami_unlock;
  }

  toggleEditName() {
    this.editNameStatus = !this.editNameStatus;
  }
  toggleEditEmail() {
    this.editEmailStatus = !this.editEmailStatus;
  }
  toggleEditProfilePic() {
    this.editProfilePicStatus = !this.editProfilePicStatus;
  }
  toggleYoda() {
    this.askYoda = !this.askYoda;
  }

  editName() {
    console.log('clicked edit name');
  }

  editEmail() {
    console.log('clicked edit email');
  }

  updateUser() {
    return {
      user_id: this.user.user_id,
      email: this.user.email,
      profile_img: this.user.profile_img,
      konami_unlock: this.konamiMaster
    }
  }

  editProfilePic(avatar) {
    this.user.profile_img = this.avatars[avatar];
    const data = this.updateUser();
    this.userService.setProfilePic(data).subscribe(result => {
      this.authService.newToken(this.user).subscribe();
    });
  }

  @HostListener('document: keydown', ['$event'])
  checkKonami(event: KeyboardEvent) {
    this.key = event.keyCode;
    if (this.key == this.code[this.index]) {
      if (this.index === this.code.length-1) {
        this.user.konami_unlock = true;
        this.konamiMaster = true;
        this.user.profile_img = "assets/img/images/yoda.png";
        this.userService.setKonami(this.user).subscribe();
        return this.rankData = {
          bestTitle: 'Grand Master',
          achievement: 'A True Jedi Knight',
          wisdom: 'The student becomes the Master',
          hint: 'May the Force be with you.',
        }
      }
      return this.index++;
    }
    return this.index = 0;
  }

}
