import { TestBed } from '@angular/core/testing';

import { KeyBrandService } from './key-brand.service';

describe('KeyBrandService', () => {
  let service: KeyBrandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyBrandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
