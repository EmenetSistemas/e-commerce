import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { ProductosService } from '../../services/productos/productos.service';

@Component({
	selector: 'app-detalle-producto',
	templateUrl: './detalle-producto.component.html',
	styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {
	@Input() idProducto : any = {};

	protected producto : any = {};

	constructor (
		private modalService: ModalService,
		private apiProductos: ProductosService
	) { }

	ngOnInit(): void {
		this.obtenerDetalleProductoPorId(this.idProducto);
	}

	private obtenerDetalleProductoPorId ( idProducto : number ) : any {
		this.producto = this.apiProductos.obtenerDetalleProductoPorId(idProducto);
	}

	public cerrarModal() {
		this.modalService.cerrarModal();
	}
}