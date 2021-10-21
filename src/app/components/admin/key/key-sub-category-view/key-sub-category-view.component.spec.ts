import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeySubCategoryViewComponent } from './key-sub-category-view.component';

describe('KeySubCategoryViewComponent', () => {
  let component: KeySubCategoryViewComponent;
  let fixture: ComponentFixture<KeySubCategoryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeySubCategoryViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeySubCategoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
