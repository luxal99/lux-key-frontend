import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyCategoryOverviewComponent } from './key-category-overview.component';

describe('KeyCategoryOverviewComponent', () => {
  let component: KeyCategoryOverviewComponent;
  let fixture: ComponentFixture<KeyCategoryOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyCategoryOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyCategoryOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
