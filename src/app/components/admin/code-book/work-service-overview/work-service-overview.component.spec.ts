import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkServiceOverviewComponent } from './work-service-overview.component';

describe('WorkServiceOverviewComponent', () => {
  let component: WorkServiceOverviewComponent;
  let fixture: ComponentFixture<WorkServiceOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkServiceOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkServiceOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
