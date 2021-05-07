import { TestBed } from '@angular/core/testing';

import { KeySubCategoryService } from './key-sub-category.service';

describe('KeySubCategoryService', () => {
  let service: KeySubCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeySubCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
