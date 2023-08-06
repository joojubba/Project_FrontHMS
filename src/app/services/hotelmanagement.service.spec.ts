import { TestBed } from '@angular/core/testing';

import { HotelmanagementService } from './hotelmanagement.service';

describe('HotelmanagementService', () => {
  let service: HotelmanagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelmanagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
