import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos/productos.service';
import { ModalService } from '../../services/modal/modal.service';

@Component({
	selector: 'app-pedidos',
	templateUrl: './pedidos.component.html',
	styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit{
	protected pedidos : any = [];
	constructor (
		private apiProductos : ProductosService,
		private modalService : ModalService
	) {}

	ngOnInit(): void {
		this.obtenerPedidos();
	}

	private obtenerPedidos () : void {
		this.pedidos = this.apiProductos.obtenerPedidos();
	}

	public cerrarModal() {
		this.modalService.cerrarModal();
	}
}