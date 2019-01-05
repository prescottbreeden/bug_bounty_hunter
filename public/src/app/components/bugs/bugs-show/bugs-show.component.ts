import { Component, OnInit, HostListener, } from '@angular/core';
import { AuthService } from 'src/app/common/services/auth.service';
import { Router } from '@angular/router';
import { BugService } from 'src/app/common/services/bug.service';
import { BugModel, MapBugData } from 'src/app/common/models/Bug';
import { UserModel, MapUserData } from 'src/app/common/models/User';
import { isNull } from 'util';

@Component({
  selector: 'app-bugs-show',
  templateUrl: './bugs-show.component.html',
})
export class BugsShowComponent implements OnInit {
  user: UserModel;
  bugs: BugModel[] = [];
  fBugs: BugModel[] = [];
  searchText: string = '';
  showFavorites: boolean = false;
  index: number = 0;

  troll: string[] = [
    "Me not that kind of Orc.",
    "Poke, poke, poke, is that all you do?",
    "Ooo, that was kinda nice.",
    "You're the king? Well I didn't vote for you",
    "Help, help! I'm being repressed!",
    "Moose bites can be pretti nasti.",
    "I never say 'Ni'.",
    "It's only a flesh wound.",
    "Norwegian Blue, lovely plumage.",
    "Spam, spam, spam, spam, spam, spam, spam, spam..."
  ];


  constructor(
    private authService: AuthService,
    private router: Router,
    private bugService: BugService
  ) { }

  ngOnInit() {
    const token = this.authService.getToken();
    if (isNull(token)) {
      return this.router.navigate(['/']);
    }
    this.user = MapUserData(token.currentUser);
    this.getAllBugs();
    this.getFavorites();
  }

  getAllBugs() {
    this.bugService.getBugs().subscribe(results => {
      this.bugs = MapBugData(results);
    });
  }

  getFavorites() {
    this.bugService.getFavorites(this.user.user_id)
      .subscribe(results => {
        this.fBugs = MapBugData(results);
      })
  }

  toggleFavorites() {
    this.showFavorites = !this.showFavorites;
  }
  
  triggerAlert() {
    alert(this.troll[this.index]);
    this.index++;
    this.index = this.index % 10;
  }




}
