import { TestBed } from '@angular/core/testing';

import { LoggedAuthGuard } from './logged-auth-guard';

describe('LoggedAuthGuard', () => {
  let service: LoggedAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggedAuthGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
