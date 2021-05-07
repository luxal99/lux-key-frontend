import { TestBed } from '@angular/core/testing';

import { KeyCategoryService } from './key-category.service';

describe('KeyCategoryService', () => {
  let service: KeyCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
