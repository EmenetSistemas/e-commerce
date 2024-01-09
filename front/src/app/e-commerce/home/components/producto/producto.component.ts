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

	protected agregarItemCarrito ( idProducto : number ) : any {
		this.msj.mensajeEsperarToast();
		try {
			this.apiProductos.agregarItemCarrito(idProducto);
			this.msj.mensajeGenericoToast('Se agregó al carrito', 'success');
		} catch (e) {
			this.msj.mensajeGenericoToast('error', 'error');
		}
	}
}