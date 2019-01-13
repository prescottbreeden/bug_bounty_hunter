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
  editNameStatus: boolean = false;
  editEmailStatus: boolean = false;
  editProfilePicStatus: boolean = true;
  showYoda: boolean = false;
  kesselCommander: boolean = false;
  konamiMaster: boolean = false;
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

rankData: any = {
  bestTitle: '',
  achievement: '',
  wisdom: '',
  hint: ''
}

avatars: string[] = [ 
  'assets/img/images/bobafett.png',
  'assets/img/images/windu.png',
  'assets/img/images/vader.png',
  'assets/img/images/deathstar.png',
  'assets/img/images/falcon.png',
  'assets/img/images/r2d2.png',
  'assets/img/images/yoda.png'
 ]

  user: UserModel = {
    user_id: 0,
    faction_name: '',
    first_name: '',
    last_name: '',
    email: '',
    profile_img: '',
    created_at: '',
    updated_at: '',
    admin: false
  };

  stats: UserStats = {
    bugs_posted: 0,
    answers_posted: 0,
    favorites: 0,
    konami_unlock: false
  };

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
    this.userService.getById(this.user.user_id)
      .subscribe(result => {
        this.user = MapUserData(result[0]);
      })
    this.userService.getUserStatsById(this.user.user_id)
      .subscribe(result => {
        this.stats = MapUserStatsData(result[0]);
        this.setRank();
        this.setTitle(); 
      });
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
    this.showYoda = !this.showYoda;
  }

  editName() {
    console.log('clicked edit name');
  }

  editEmail() {
    console.log('clicked edit email');
  }

  updateUser() {
    console.log(this.user.profile_img)
    return {
      user_id: this.user.user_id,
      email: this.user.email,
      profile_img: this.user.profile_img
    }
  }

  editProfilePic(avatar) {
    this.user.profile_img = this.avatars[avatar];
    const data = this.updateUser(); 

    this.userService.setProfilePic(data).subscribe(result => {
      console.log(result);
    });
  }

  setRank() {
    if(this.stats.konami_unlock) {
      this.konamiMaster = true;
    }
    // if(this.stats.falcon_unlock) {
    //   this.kesselCommander = true;
    // }
    if(this.stats.bugs_posted + this.stats.answers_posted >= 30) {
      return this.rank = 7;
    }
    if(this.stats.bugs_posted >= 12) {
      return this.rank = 6;
    }
    if(this.stats.answers_posted >= 12) {
      return this.rank = 5;
    }
    if(this.stats.bugs_posted + this.stats.answers_posted >= 15) {
      return this.rank = 4;
    }
    if(this.stats.bugs_posted + this.stats.answers_posted >= 6) {
      return this.rank = 3;
    }
    if(this.stats.bugs_posted + this.stats.answers_posted < 6) {
      return this.rank = 2
    } 
    if(this.stats.bugs_posted + this.stats.answers_posted === 0) {
      return this.rank = 1
    } 
  }

  setTitle() {
    switch (this.rank) {
      case 1:
        return this.rankData = {
          bestTitle: 'Service Droid',
          achievement: 'New Member',
          hint: 'Fear of writing your first is the path to the dark side.',
          wisdom: 'Post bug or message, you will. Hrrrrrrm?',
        }
      case 2:
        return this.rankData = {
          bestTitle: 'TK-421',
          achievement: 'Created First Post',
          hint: 'At 6 posts, your next achievement is. Yrrrrs.',
          wisdom: 'Clear your mind must be.',
        }
      case 3:
        return this.rankData = {
          bestTitle: 'Bug Hunter',
          achievement: 'Posted 6+ Times',
          wisdom: 'Patience you must have.',
          hint: 'At 15 posts, your next achievement is. Hmmmph.',
        }
      case 4:
        return this.rankData = {
          bestTitle: 'Master Bug Hunter',
          achievement: 'Posted 15+ Times',
          wisdom: 'Difficult to see. Always in motion the future is.',
          hint: 'You must confront bug vader. Then, only then, a Jedi will you be.',
        }
      case 5:
        return this.rankData = {
        bestTitle: 'Bug Vadar',
        achievement: 'Posted 12+ Answers',
        wisdom: 'Mind what you have learned. Save you it can.',
        hint: 'Try not. Post or do not. There is no try.',
        }
      case 6:
        return this.rankData = {
          bestTitle: 'The Bug Star',
          achievement: 'Posted 12+ Bugs',
          wisdom: 'Master of vim, not emacs, a true hacker is.',
          hint: 'Always pass on what you have learned.',
        }
      case 7:
        return this.rankData = {
          bestTitle: 'Hacker',
          achievement: 'Posted 30+ Times',
          wisdom: 'Through the Force, things you will see. other places. the future, the past. old friends long gone.',
          hint: 'Posted 30 times have you, yet 30 lives you require.',
        }
    }
  }

  @HostListener('document: keydown', ['$event'])
  checkKonami(event: KeyboardEvent) {
    this.key = event.keyCode;
    if (this.key == this.code[this.index]) {
      if (this.index === this.code.length-1) {
        this.stats.konami_unlock = true;
        this.user.profile_img = "assets/img/images/yoda.png";
        return this.rankData = {
          bestTitle: 'Grand Master',
          achievement: 'A True Jedi Knight',
          hint: 'May the Force be with you.',
        }
      } 
      return this.index++;
    }
    return this.index = 0;
  }

}
