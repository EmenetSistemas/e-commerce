import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { ProductosService } from '../../services/productos/productos.service';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';

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
		private apiProductos : ProductosService,
		private msj : MensajesService
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

	protected eliminarProducto (data : any) : any {
		this.productos.items = this.productos.items.filter(
			(item : any) => item.idItem !== data.idProducto
		);
		this.productosVenta = this.productosVenta.filter(
			(item : any) => item.id !== data.idProducto
		);
		this.msj.mensajeGenericoToast('Se eliminó el producto de la compra', 'success');
	}

	public cerrarModal() {
		this.modalService.cerrarModal();
	}
}
