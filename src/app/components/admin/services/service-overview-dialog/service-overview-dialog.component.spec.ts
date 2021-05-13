import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceOverviewDialogComponent } from './service-overview-dialog.component';

describe('ServiceOverviewDialogComponent', () => {
  let component: ServiceOverviewDialogComponent;
  let fixture: ComponentFixture<ServiceOverviewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceOverviewDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceOverviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
