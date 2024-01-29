import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoPedidoComponent } from './seguimiento-pedido.component';

describe('SeguimientoPedidoComponent', () => {
  let component: SeguimientoPedidoComponent;
  let fixture: ComponentFixture<SeguimientoPedidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeguimientoPedidoComponent]
    });
    fixture = TestBed.createComponent(SeguimientoPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
