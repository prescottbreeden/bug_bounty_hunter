import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerShowComponent } from './answer-show.component';

describe('AnswerShowComponent', () => {
  let component: AnswerShowComponent;
  let fixture: ComponentFixture<AnswerShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
