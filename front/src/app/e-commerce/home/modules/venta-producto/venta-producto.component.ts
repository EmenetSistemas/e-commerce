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
		return this.productos.items.length;
	}

	protected obtenerTotalSegunProductos () : any {
		return this.apiProductos.obtenerTotalSegunProductos(this.productos.items);
	}

	protected cambioCantidadProducto (data: any) : void {
		const producto = this.productos.items.find((item : any) => item.idItem == data.idProducto);
		if (producto) {
			producto.cantidad = data.cantidad;
		}
	}

	public cerrarModal() {
		this.modalService.cerrarModal();
	}
}
