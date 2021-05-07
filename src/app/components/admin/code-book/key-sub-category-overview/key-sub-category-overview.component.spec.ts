import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeySubCategoryOverviewComponent } from './key-sub-category-overview.component';

describe('KeySubCategoryOverviewComponent', () => {
  let component: KeySubCategoryOverviewComponent;
  let fixture: ComponentFixture<KeySubCategoryOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeySubCategoryOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeySubCategoryOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
