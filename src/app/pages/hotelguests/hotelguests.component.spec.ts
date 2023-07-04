import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelguestsComponent } from './hotelguests.component';

describe('HotelguestsComponent', () => {
  let component: HotelguestsComponent;
  let fixture: ComponentFixture<HotelguestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HotelguestsComponent]
    });
    fixture = TestBed.createComponent(HotelguestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
