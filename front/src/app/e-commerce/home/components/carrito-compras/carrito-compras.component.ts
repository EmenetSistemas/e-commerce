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
		}, 1000);
	}

	private obtenerNoItemsCarritoCompras(): any {
		this.noItemsCarrito = this.apiProductos.obtenerNoItemsCarritoCompras();
	}

	protected obtenerItemsCarritoCompras(): any {
		this.itemsCarrito = this.apiProductos.obtenerItemsCarritoCompras();
	}

	protected abrirModal ( modal : string ) : any {
		switch (modal) {
			case 'detalleCompra':
				const dataModal = {
					productos : {
						items : carritoCompras.items
					}
				};
				this.modalService.abrirModalConComponente(VentaProductoComponent, dataModal);
			break;
		}
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