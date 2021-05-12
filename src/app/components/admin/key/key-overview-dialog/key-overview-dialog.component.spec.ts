import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyOverviewDialogComponent } from './key-overview-dialog.component';

describe('KeyOverviewDialogComponent', () => {
  let component: KeyOverviewDialogComponent;
  let fixture: ComponentFixture<KeyOverviewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyOverviewDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyOverviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
