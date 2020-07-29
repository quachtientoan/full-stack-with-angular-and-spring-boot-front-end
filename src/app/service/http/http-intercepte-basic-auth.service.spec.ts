import { TestBed } from '@angular/core/testing';

import { HttpIntercepteBasicAuthService } from './http-intercepte-basic-auth.service';

describe('HttpIntercepteBasicAuthService', () => {
  let service: HttpIntercepteBasicAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpIntercepteBasicAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
