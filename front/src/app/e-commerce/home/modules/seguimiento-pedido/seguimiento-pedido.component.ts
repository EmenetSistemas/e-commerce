import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import { PedidosComponent } from '../pedidos/pedidos.component';
import { ProductosService } from '../../services/productos/productos.service';

@Component({
	selector: 'app-seguimiento-pedido',
	templateUrl: './seguimiento-pedido.component.html',
	styleUrls: ['./seguimiento-pedido.component.css']
})
export class SeguimientoPedidoComponent implements OnInit{
	@Input() idDetalle: any = {};

	protected seguimientoPedido : any = {};

	constructor (
		private modalService : ModalService,
		private msj : MensajesService,
		private apiProductos : ProductosService
	) {}

	async ngOnInit(): Promise<any> {
		this.msj.mensajeEsperar();
		await this.obtenerActualizacionesPedido();
		this.msj.cerrarMensajes();
	}

	private obtenerActualizacionesPedido () : Promise<any> {
		return this.apiProductos.obtenerActualizacionesPedido(this.idDetalle).toPromise().then(
			respuesta => {
				this.seguimientoPedido = respuesta.data.fechas;
			}, error => {
				this.msj.mensajeGenerico('error', 'error');
			}
		);
	}

	protected abrirModal () : any {
		this.msj.mensajeEsperar();
		this.cerrarModal();
		setTimeout(() => {
			this.modalService.abrirModalConComponente(PedidosComponent, {}, '');
		}, 150);
	}

	public cerrarModal() {
		this.modalService.cerrarModal();
	}
}