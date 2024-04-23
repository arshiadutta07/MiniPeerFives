import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsHistoryComponent } from './rewards-history.component';

describe('RewardsHistoryComponent', () => {
  let component: RewardsHistoryComponent;
  let fixture: ComponentFixture<RewardsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RewardsHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RewardsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
