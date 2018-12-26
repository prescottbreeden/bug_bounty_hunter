import { Injectable } from '@angular/core';
import { BugModel } from './bugs/models/Bug';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private bugData = new Subject<BugModel>();

  setBugData(data) {
    this.bugData = data;
  }

  getBugData() {
    return this.bugData;
  }
}
