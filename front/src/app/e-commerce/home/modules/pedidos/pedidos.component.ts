import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos/productos.service';
import { ModalService } from '../../services/modal/modal.service';
import { carritoCompras } from 'src/environments/environment';
import { VentaProductoComponent } from '../venta-productos/venta-producto.component';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';

@Component({
	selector: 'app-pedidos',
	templateUrl: './pedidos.component.html',
	styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit{
	protected pedidos : any = [];
	constructor (
		private apiProductos : ProductosService,
		private modalService : ModalService,
		private msj : MensajesService
	) {}

	ngOnInit(): void {
		this.obtenerPedidos();
		this.msj.cerrarMensajes();
	}

	private obtenerPedidos () : void {
		this.pedidos = this.apiProductos.obtenerPedidos();
	}

	protected abrirModal () : void {
		this.msj.mensajeEsperar();
		this.cerrarModal();
		setTimeout(() => {
			const dataModal = {
				productos : {
					items : carritoCompras.items,
					static : true
				}
			};
			this.modalService.abrirModalConComponente(VentaProductoComponent, dataModal);
		}, 150);
	}

	public cerrarModal() {
		this.modalService.cerrarModal();
	}
}