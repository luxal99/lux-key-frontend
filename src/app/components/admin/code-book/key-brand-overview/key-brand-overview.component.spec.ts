import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyBrandOverviewComponent } from './key-brand-overview.component';

describe('KeyBrandOverviewComponent', () => {
  let component: KeyBrandOverviewComponent;
  let fixture: ComponentFixture<KeyBrandOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KeyBrandOverviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyBrandOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
