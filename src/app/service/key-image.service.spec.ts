import { TestBed } from '@angular/core/testing';

import { KeyImageService } from './key-image.service';

describe('KeyImageService', () => {
  let service: KeyImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
