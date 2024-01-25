import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos/productos.service';
import { VentaProductoComponent } from '../../modules/venta-productos/venta-producto.component';
import { ModalService } from '../../services/modal/modal.service';
import { carritoCompras } from 'src/environments/environment';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';

@Component({
	selector: 'app-carrito-compras',
	templateUrl: './carrito-compras.component.html',
	styleUrls: ['./carrito-compras.component.css']
})
export class CarritoComprasComponent implements OnInit {
	protected noItemsCarrito: any = 0;
	protected itemsCarrito: any = [];

	constructor(
		private apiProductos: ProductosService,
		private modalService: ModalService,
		private msj : MensajesService
	) {}

	ngOnInit(): void {
		setInterval(() => {
			this.obtenerNoItemsCarritoCompras();
		}, 2000);
	}

	private obtenerNoItemsCarritoCompras(): any {
		const token = localStorage.getItem('token');
		this.apiProductos.obtenerNoItemsCarritoCompras(token).subscribe(
			respuesta => {
				this.noItemsCarrito = respuesta.data.noItemsCarrito;
			}
		)
	}

	protected obtenerItemsCarritoCompras(): any {
		const token = localStorage.getItem('token');
		this.apiProductos.obtenerItemsCarritoCompras(token).subscribe(
			respuesta => {
				this.itemsCarrito = respuesta.data.carritoCompras;
			}, error => {
				this.msj.mensajeGenerico('error', 'error');
			}
		)
	}

	protected abrirModal ( modal : string ) : any {
		switch (modal) {
			case 'detalleCompra':
				const dataModal = {
					productos : {
						items : this.itemsCarrito,
						carrito : true
					}
				};
				this.modalService.abrirModalConComponente(VentaProductoComponent, dataModal);
			break;
		}
	}

	protected vaciarCarrito () : void {
		this.msj.mensajeConfirmacionCustom('¿Está seguro de vaciar el carrito de compras?', 'question', 'Varciar carrito de compras').then(
			respuestaMensaje => {
				if ( respuestaMensaje.isConfirmed ) {
					this.apiProductos.vaciarCarrito();
				}
			}
		);
	}

	protected eliminarItemCarrito (idProducto : number) : any {
		this.msj.mensajeConfirmacionCustom('¿Está seguro de eliminar el producto del carrito de compras?', 'question', 'Eliminar del carrito').then(
			respuestaMensaje => {
				if ( respuestaMensaje.isConfirmed ) {
					this.apiProductos.eliminarItemCarrito(idProducto);
					this.obtenerNoItemsCarritoCompras();
				}
				return;
			}
		);
	}
}