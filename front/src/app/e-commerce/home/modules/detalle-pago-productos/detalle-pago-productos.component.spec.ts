import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePagoProductosComponent } from './detalle-pago-productos.component';

describe('DetallePagoProductosComponent', () => {
  let component: DetallePagoProductosComponent;
  let fixture: ComponentFixture<DetallePagoProductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallePagoProductosComponent]
    });
    fixture = TestBed.createComponent(DetallePagoProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
