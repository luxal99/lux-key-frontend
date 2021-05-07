import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementBindingComponent } from './element-binding.component';

describe('ElementBindingComponent', () => {
  let component: ElementBindingComponent;
  let fixture: ComponentFixture<ElementBindingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementBindingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementBindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
