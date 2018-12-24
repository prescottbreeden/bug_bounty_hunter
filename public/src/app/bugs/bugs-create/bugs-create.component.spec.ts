import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BugsCreateComponent } from './bugs-create.component';

describe('BugsCreateComponent', () => {
  let component: BugsCreateComponent;
  let fixture: ComponentFixture<BugsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BugsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BugsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
