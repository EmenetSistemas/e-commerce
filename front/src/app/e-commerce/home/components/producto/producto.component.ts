import { Component, Input } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { DetalleProductoComponent } from '../../modules/detalle-producto/detalle-producto.component';
import { ProductosService } from '../../services/productos/productos.service';

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
		private apiProductos: ProductosService
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
}