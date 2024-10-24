import { ComponentFixture, TestBed } from '@angular/core/testing';

import { POIComponent } from './poi.component';

describe('POIComponent', () => {
  let component: POIComponent;
  let fixture: ComponentFixture<POIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [POIComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(POIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
