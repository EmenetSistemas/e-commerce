import { Component, Input } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { DetalleProductoComponent } from '../../modules/detalle-producto/detalle-producto.component';
import { ProductosService } from '../../services/productos/productos.service';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import { VentaProductoComponent } from '../../modules/venta-producto/venta-producto.component';

@Component({
	selector: 'app-producto',
	templateUrl: './producto.component.html',
	styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
	@Input() idProducto: any = [];

	protected producto : any = {};

	constructor(
		private modalService: ModalService,
		private apiProductos: ProductosService,
		private msj : MensajesService
	) { }

	ngOnInit(): void {
		this.obtenerDetalleProductoPorId(this.idProducto);
	}

	private obtenerDetalleProductoPorId ( idProducto : number ) : any {
		this.producto = this.apiProductos.obtenerDetalleProductoPorId(idProducto);
	}

	protected abrirModal ( modal : string ) : any {
		switch (modal) {
			case 'detalleProducto':
				const dataModal1 = {
					idProducto : this.idProducto
				};
				this.modalService.abrirModalConComponente(DetalleProductoComponent, dataModal1);
			break;
			case 'detalleCompra':
				const dataModal2 = {
					productos : {
						items : [{
							idItem : this.idProducto,
							cantidad : 1
						}]
					}
				};
				this.modalService.abrirModalConComponente(VentaProductoComponent, dataModal2);
			break;
		}
	}

	protected agregarItemCarrito () : any {
		this.msj.mensajeEsperarToast();
		try {
			const busquedaProd = this.apiProductos.validarProductoCarrito(this.idProducto);

			if (busquedaProd == null) {
				this.apiProductos.agregarItemCarrito(this.idProducto);
				this.msj.mensajeGenericoToast('Se agregó al carrito', 'success');
				return;
			}

			const productosEnCarrito : any = this.apiProductos.productosEnCarrito(this.idProducto);

			if ((Number(productosEnCarrito) + 1) > this.producto.stock) {
				this.msj.mensajeGenerico('Actualmente cuentas con ' +productosEnCarrito+(productosEnCarrito == 1 ? ' producto' : ' productos')+' en tu carrito, e intentas agregar ' + 1 + ' más, lo cual no es posible', 'warning', this.producto.stock + ' productos en stock');
				return;
			}

			this.msj.mensajeConfirmacionCustom('Al parecer ya se agregó este artículo a tu carrito. ¿Desea agregar 1 más?', 'question', 'Artículo en carrito').then(
				respuestaMensaje => {
					if ( respuestaMensaje.isConfirmed ) {
						this.msj.mensajeGenericoToast('Se agregó al carrito', 'success');
						this.apiProductos.agregarItemCarrito(this.idProducto);
						return;
					}
				}
			);
		} catch (e) {
			console.log(e);
			this.msj.mensajeGenerico('error', 'error');
		}
	}
}