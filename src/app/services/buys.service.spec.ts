import { TestBed } from '@angular/core/testing';

import { BuysService } from './buys.service';

describe('BuysService', () => {
  let service: BuysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
