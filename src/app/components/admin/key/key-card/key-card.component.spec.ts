import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyCardComponent } from './key-card.component';

describe('KeyCardComponent', () => {
  let component: KeyCardComponent;
  let fixture: ComponentFixture<KeyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
