import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsControllerComponent } from './payments-controller.component';

describe('PaymentsControllerComponent', () => {
  let component: PaymentsControllerComponent;
  let fixture: ComponentFixture<PaymentsControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentsControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentsControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
