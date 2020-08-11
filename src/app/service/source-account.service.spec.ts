import { TestBed } from '@angular/core/testing';

import { SourceAccountService } from './source-account.service';

describe('SourceAccountService', () => {
  let service: SourceAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SourceAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
