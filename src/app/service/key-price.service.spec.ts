import { TestBed } from '@angular/core/testing';

import { KeyPriceService } from './key-price.service';

describe('KeyPriceService', () => {
  let service: KeyPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
