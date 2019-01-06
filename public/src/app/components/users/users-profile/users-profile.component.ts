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

//  Youngling -- faction : new register
//  Padawan -- faction : first bug posted
//  Knight -- boba fett : 6 interactions (post/answer)
//  Master -- windu : 20 interactions
//  Grand Master -- yoda : secret
//  Kessel Commander -- m.falcon : answer bug within 10 minutes
//  Bug Vader -- vadar : 15 answers
//  Hacker -- R2D2 : 30 interactions
//  The Bug Star -- death star : 15 bugs

titles: any = {
  'Knight': 'assets/img/images/bobafett.png',
  'Master': 'assets/img/images/windu.png',
  'Kessel Commander': 'assets/img/images/falcon.png',
  'Bug Vadar': 'assets/img/images/vader.png',
  'The Bug Star': 'assets/img/images/deathstar.png',
  'Grand Master': 'assets/img/images/yoda.png',
  'Hacker': 'assets/img/images/r2d2.png'
};

  bestTitle: string;
  user: UserModel = {
    user_id: '',
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
        this.setTitle(); 
      });
  }

  setTitle() {
  //  Youngling -- faction : new register
  //  Padawan -- faction : first bug posted
  //  Knight -- boba fett : 6 interactions (post/answer)
  //  Master -- windu : 20 interactions
  //  Kessel Commander -- m.falcon : answer bug within 10 minutes
  //  Bug Vader -- vadar : 15 answers
  //  The Bug Star -- death star : 15 bugs
  //  Grand Master -- yoda : secret
  //  Hacker -- R2D2 : 30 interactions
    
  // this should be done in reverse if it's done at all this way...
  if(this.stats.bugs_posted + this.stats.answers_posted === 0) {
    this.bestTitle = 'Youngling'
  } else if(this.stats.bugs_posted + this.stats.answers_posted < 6) {
    this.bestTitle = 'Padawan'
  } else {
      if(this.stats.bugs_posted + this.stats.answers_posted >= 6) {
        this.bestTitle = 'Knight';
      }
      if(this.stats.bugs_posted + this.stats.answers_posted >= 15) {
        this.bestTitle = 'Master';
      }
      if(this.stats.answers_posted >= 18) {
        this.bestTitle = 'Bug Vadar';
      }
      if(this.stats.bugs_posted >= 15) {
        this.bestTitle = 'The Bug Star';
      }
      if(this.stats.konami_unlock) {
        this.bestTitle = 'Grand Master';
      }
      if(this.stats.bugs_posted + this.stats.answers_posted >= 30) {
        this.bestTitle = 'Hacker';
      }
      this.user.profile_img = this.titles[this.bestTitle];
  }
}

@HostListener('document: keydown', ['$event'])
checkKonami(event: KeyboardEvent) {
this.key = event.keyCode;
if (this.key == this.code[this.index]) {
  if (this.index === this.code.length-1) {
    this.stats.konami_unlock = true;
    this.user.profile_img = "assets/img/images/yoda.png";
  } 
  return this.index++;
}
return this.index = 0;
}

}
