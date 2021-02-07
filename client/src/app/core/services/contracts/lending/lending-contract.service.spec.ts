import { TestBed } from '@angular/core/testing';

import { LendingContractService } from './lending-contract.service';

describe('LendingContractService', () => {
  let service: LendingContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LendingContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
