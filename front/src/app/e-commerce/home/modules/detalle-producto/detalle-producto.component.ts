import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { ProductosService } from '../../services/productos/productos.service';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';

@Component({
	selector: 'app-detalle-producto',
	templateUrl: './detalle-producto.component.html',
	styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {
	@Input() idProducto : any = {};

	protected producto : any = {};
	protected cantidad: number = 1;

	constructor (
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

	protected agregarItemCarrito () : any {
		this.msj.mensajeEsperarToast();
		try {
			const busquedaProd = this.apiProductos.validarProductoCarrito(this.idProducto);
			if (busquedaProd == null) {
				this.apiProductos.agregarItemCarrito(this.idProducto, this.cantidad);
				this.msj.mensajeGenericoToast('Se agregó al carrito', 'success');
				return;
			}

			this.msj.mensajeConfirmacionCustom('Al parecer ya se agregó este artículo a tu carrito. ¿Desea agregar '+this.cantidad+' más?', 'question', 'Artículo en carrito').then(
				respuestaMensaje => {
					if ( respuestaMensaje.isConfirmed ) {
						this.msj.mensajeGenericoToast('Se agregó al carrito', 'success');
						this.apiProductos.agregarItemCarrito(this.idProducto, this.cantidad);
						return;
					}
				}
			);
		} catch (e) {
			console.log(e);
			this.msj.mensajeGenerico('error', 'error');
		}
	}

	public cerrarModal() {
		this.modalService.cerrarModal();
	}
}