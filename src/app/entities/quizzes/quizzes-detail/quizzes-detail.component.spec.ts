import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzesDetailComponent } from './quizzes-detail.component';

describe('QuizzesDetailComponent', () => {
  let component: QuizzesDetailComponent;
  let fixture: ComponentFixture<QuizzesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizzesDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizzesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
