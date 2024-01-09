import { Component, Input } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { DetalleProductoComponent } from '../../modules/detalle-producto/detalle-producto.component';
import { ProductosService } from '../../services/productos/productos.service';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';

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

	protected abrirModalDetalleProducto () {
		const dataModal = {
			idProducto : this.idProducto
		};
		this.modalService.abrirModalConComponente(DetalleProductoComponent, dataModal);
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