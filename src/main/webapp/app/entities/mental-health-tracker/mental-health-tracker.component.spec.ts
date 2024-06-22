import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentalHealthTrackerComponent } from './mental-health-tracker.component';

describe('MentalHealthTrackerComponent', () => {
  let component: MentalHealthTrackerComponent;
  let fixture: ComponentFixture<MentalHealthTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MentalHealthTrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentalHealthTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
