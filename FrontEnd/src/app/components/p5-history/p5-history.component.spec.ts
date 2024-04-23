import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P5HistoryComponent } from './p5-history.component';

describe('P5HistoryComponent', () => {
  let component: P5HistoryComponent;
  let fixture: ComponentFixture<P5HistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [P5HistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(P5HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
