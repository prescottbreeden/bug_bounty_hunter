import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BugsShowComponent } from './bugs-show.component';

describe('BugsShowComponent', () => {
  let component: BugsShowComponent;
  let fixture: ComponentFixture<BugsShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BugsShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BugsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
