import { Component, Input } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { DetalleProductoComponent } from '../../modules/detalle-producto/detalle-producto.component';
import { ProductosService } from '../../services/productos/productos.service';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import { VentaProductoComponent } from '../../modules/venta-producto/venta-producto.component';

@Component({
	selector: 'app-producto-venta',
	templateUrl: './producto-venta.component.html',
	styleUrls: ['./producto-venta.component.css']
})
export class ProductoVentaComponent {
	@Input() idProducto: any = [];
	@Input() cantidadProducto: any = 0;

	protected producto: any = {};

	constructor(
		private modalService: ModalService,
		private apiProductos: ProductosService,
		private msj: MensajesService
	) { }

	ngOnInit(): void {
		this.obtenerDetalleProductoPorId(this.idProducto);
	}

	private obtenerDetalleProductoPorId(idProducto: number): any {
		this.producto = this.apiProductos.obtenerDetalleProductoPorId(idProducto);
	}
}