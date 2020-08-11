import { TestBed } from '@angular/core/testing';

import { MoneyTranferService } from './money-tranfer.service';

describe('MoneyTranferService', () => {
  let service: MoneyTranferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoneyTranferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
