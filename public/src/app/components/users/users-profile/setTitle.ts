import { Rank } from 'src/app/common/models/user/Rank';
import { User } from 'src/app/common/models/user/User';

export function setTitle(user: User): Rank {
    if (user.konami_unlock) {
      return {
          bestTitle: 'Grand Master',
          achievement: 'A True Jedi Knight',
          wisdom: 'The student becomes the Master.',
          hint: 'May the Force be with you.',
      }
    }
    console.log(user);
    switch (user.rank) {
      case 1:
        return {
          bestTitle: 'Service Droid',
          achievement: 'New Member',
          hint: 'Fear of writing your first is the path to the dark side.',
          wisdom: 'Post bug or message, you will. Hrrrrrrm?',
        }
      case 2:
        return {
          bestTitle: 'TK-421',
          achievement: 'Created First Post',
          hint: 'At 6 posts, your next achievement is. Yrrrrs.',
          wisdom: 'Clear your mind must be.',
        }
      case 3:
        return {
          bestTitle: 'Bug Hunter',
          achievement: 'Posted 6+ Times',
          wisdom: 'Patience you must have.',
          hint: 'At 15 posts, your next achievement is. Hmmmph.',
        }
      case 4:
        return {
          bestTitle: 'Master Bug Hunter',
          achievement: 'Posted 15+ Times',
          wisdom: 'Difficult to see. Always in motion the future is.',
          hint: 'You must confront bug vader. Then, only then, a Jedi will you be.',
        }
      case 5:
        return {
        bestTitle: 'Bug Vadar',
        achievement: 'Posted 12+ Answers',
        wisdom: 'Mind what you have learned. Save you it can.',
        hint: 'Try not. Post or do not. There is no try.',
        }
      case 6:
        return {
          bestTitle: 'The Bug Star',
          achievement: 'Posted 12+ Bugs',
          wisdom: 'Master of vim, not emacs, a true hacker is.',
          hint: 'Always pass on what you have learned.',
        }
      case 7:
        return {
          bestTitle: 'Hacker',
          achievement: 'Posted 30+ Times',
          wisdom: 'Through the Force, things you will see. other places. the future, the past. old friends long gone.',
          hint: 'Posted 30 times have you, yet 30 lives you require.',
        }
    }
  }

  export function setRank(user: User) {
    // if(user.falcon_unlock) {
    //   this.kesselCommander = true;
    // }
    if(user.bugs + user.answers >= 30) {
      return 7;
    }
    if(user.bugs >= 12) {
      return 6;
    }
    if(user.answers >= 12) {
      return 5;
    }
    if(user.bugs + user.answers >= 15) {
      return 4;
    }
    if(user.bugs + user.answers >= 6) {
      return 3;
    }
    if(user.bugs + user.answers < 6) {
      return 2;
    }
    return 1;
  }