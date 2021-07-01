import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSubHeaderComponent } from './order-sub-header.component';

describe('OrderSubHeaderComponent', () => {
  let component: OrderSubHeaderComponent;
  let fixture: ComponentFixture<OrderSubHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSubHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSubHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
