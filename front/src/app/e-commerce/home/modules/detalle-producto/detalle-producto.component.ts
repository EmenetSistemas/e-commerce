import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';

@Component({
	selector: 'app-detalle-producto',
	templateUrl: './detalle-producto.component.html',
	styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {
	@Input() producto : any = {};

	constructor (
		private modalService: ModalService
	) { }

	ngOnInit(): void {
		console.log(this.producto);
	}

	public cerrarModal() {
		this.modalService.cerrarModal();
	}
}