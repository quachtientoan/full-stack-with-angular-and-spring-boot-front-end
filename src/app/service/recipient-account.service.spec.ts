import { TestBed } from '@angular/core/testing';

import { RecipientAccountService } from './recipient-account.service';

describe('RecipientAccountService', () => {
  let service: RecipientAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipientAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
