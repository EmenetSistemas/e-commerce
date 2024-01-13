import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { ProductosService } from '../../services/productos/productos.service';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import { PedidosComponent } from '../pedidos/pedidos.component';

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
		this.msj.mensajeEsperar();
		this.obtenerProductosVenta();
		this.msj.cerrarMensajes();
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
		this.obtenerProductosVenta();

		if (this.productos.static) {
			this.apiProductos.cancelarProductoPedido(this.productos.idPedido, data.idProducto);
			if (this.productosVenta.length > 0) {
				this.msj.mensajeGenericoToast('Se eliminó el producto del pedido', 'success');
			} else {
				this.apiProductos.cancelarPedido(this.productos.idPedido);
				this.cerrarModal();
				if (this.apiProductos.obtenerPedidos().length > 0) {
					this.abrirModal();
					return;
				}
				this.msj.mensajeGenerico('Al parecer no hay más productos en este pedido', 'info', 'Productos pedido #PE-'+this.productos.idPedido);
			}
			return;
		}

		if (this.productosVenta.length > 0) {
			this.msj.mensajeGenericoToast('Se eliminó el producto de la compra', 'success');
		} else {
			this.cerrarModal();
			this.msj.mensajeGenerico('Al parecer no hay productos para realizar la compra', 'info', 'Compra productos');
		}
	}

	protected abrirModal () : any {
		this.msj.mensajeEsperar();
		this.cerrarModal();
		setTimeout(() => {
			this.modalService.abrirModalConComponente(PedidosComponent);
		}, 150);
	}

	public cerrarModal() {
		this.modalService.cerrarModal();
	}
}