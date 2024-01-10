import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos/productos.service';
import { VentaProductoComponent } from '../../modules/venta-producto/venta-producto.component';
import { ModalService } from '../../services/modal/modal.service';
import { carritoCompras } from 'src/environments/environment';

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
		private modalService: ModalService
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
				const dataModal2 = {
					productos : {
						items : carritoCompras.items
					}
				};
				this.modalService.abrirModalConComponente(VentaProductoComponent, dataModal2);
			break;
		}
	}

	protected eliminarItemCarrito (idProducto : number) : any {
		this.apiProductos.eliminarItemCarrito(idProducto);
		this.obtenerNoItemsCarritoCompras();
	}
}