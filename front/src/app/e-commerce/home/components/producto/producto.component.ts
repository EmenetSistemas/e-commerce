import { Component, Input } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { DetalleProductoComponent } from '../../modules/detalle-producto/detalle-producto.component';

@Component({
	selector: 'app-producto',
	templateUrl: './producto.component.html',
	styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
	@Input() producto: any = [];

	constructor(
		private modalService: ModalService
	) { }

	protected abrirModalDetalleProducto () {
		const dataModal = {
			producto : this.producto
		};
		this.modalService.abrirModalConComponente(DetalleProductoComponent, dataModal);
	}
}