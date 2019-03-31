import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/common/services/auth.service';
import { Router } from '@angular/router';
import { BugService } from 'src/app/common/services/bug.service';
import { User } from 'src/app/common/models/user/User';
import { isNull } from 'util';
import { Bug } from 'src/app/common/models/bug/Bug';

@Component({
  selector: 'app-bugs-show',
  templateUrl: './bugs-show.component.html',
})
export class BugsShowComponent implements OnInit {
  user = new User;
  bugs: Bug[] = [];
  fBugs: Bug[] = [];
  searchText = '';
  showFavorites = false;
  index: number = 0;
  editMode = false;

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
    this.user = token.currentUser;
    this.getAllBugs();
    this.getFavorites();
  }

  getAllBugs() {
    this.bugService.getBugs()
      .subscribe((results: Bug[]) => this.bugs = results);
  }

  deleteBug(bug_id: number) {
    this.bugService.deleteBug(bug_id).subscribe(results => {
      // offer undo button
      console.log(results);
    })
  }

  getFavorites() {
    this.bugService.getFavorites(this.user.user_id)
      .subscribe((results: Bug[]) => {
        this.fBugs = results;
      });
  }

  toggleFavorites() {
    this.showFavorites = !this.showFavorites;
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  triggerAlert() {
    alert(this.troll[this.index]);
    this.index++;
    this.index = this.index % 10;
  }

}
