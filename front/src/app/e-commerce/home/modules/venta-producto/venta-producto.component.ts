import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { ProductosService } from '../../services/productos/productos.service';

@Component({
	selector: 'app-venta-producto',
	templateUrl: './venta-producto.component.html',
	styleUrls: ['./venta-producto.component.css']
})
export class VentaProductoComponent implements OnInit {
	@Input() productos: any = [];

	protected productosVenta: any = [];

	constructor(
		private modalService : ModalService,
		private apiProductos : ProductosService
	) {}

	ngOnInit(): void {
		this.obtenerProductosVenta();
	}

	protected obtenerProductosVenta () : any {
		this.productosVenta = this.apiProductos.obtenerItemsCarritoCompras(this.productos);
	}

	public obtenerCantidadTotal () : any {
		return Number (this.productos.items.reduce(
			(total : any, producto : any) => total + producto.cantidad,
			0
		));
	}

	protected obtenerTotalSegunProductos () : any {
		return this.apiProductos.obtenerTotalSegunProductos(this.productos.items);
	}

	public cerrarModal() {
		this.modalService.cerrarModal();
	}
}
