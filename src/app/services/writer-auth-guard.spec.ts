import { TestBed } from '@angular/core/testing';

import { WriterAuthGuard } from './writer-auth-guard';

describe('WriterAuthGuard', () => {
  let service: WriterAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WriterAuthGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
