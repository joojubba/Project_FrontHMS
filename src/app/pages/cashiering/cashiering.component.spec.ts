import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashieringComponent } from './cashiering.component';

describe('CashieringComponent', () => {
  let component: CashieringComponent;
  let fixture: ComponentFixture<CashieringComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CashieringComponent]
    });
    fixture = TestBed.createComponent(CashieringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
