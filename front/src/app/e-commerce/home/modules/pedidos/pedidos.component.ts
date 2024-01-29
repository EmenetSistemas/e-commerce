import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos/productos.service';
import { ModalService } from '../../services/modal/modal.service';
import { VentaProductoComponent } from '../venta-productos/venta-producto.component';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import { SeguimientoPedidoComponent } from '../seguimiento-pedido/seguimiento-pedido.component';

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

	async ngOnInit(): Promise<any> {
		await this.obtenerPedidos();
		this.msj.cerrarMensajes();
	}

	private async obtenerPedidos () : Promise<any> {
		const token = localStorage.getItem('token');
		return this.apiProductos.obtenerPedidos(token).toPromise().then(
			respuesta => {
				this.pedidos = respuesta.data.pedidos;
			}, error => {
				this.msj.mensajeGenerico('error', 'error');
			}
		);
	}

	protected abrirModal (idModal : string, idPedido : number, fkStatus : number) : void {
		const itemsPedido = this.pedidos.find((pedido : any) => pedido.idPedido === idPedido);

		this.cerrarModal();

		setTimeout(() => {
			switch (idModal) {
				case 'detallePedido':
					const dataModal = {
						productos : {
							items : itemsPedido.productos,
							static : true,
							idPedido : idPedido,
							fkStatus : fkStatus,
						}
					};
					this.modalService.abrirModalConComponente(VentaProductoComponent, dataModal);
				break;
				case 'seguimientoPedido':
					const dataModal1 = {
						idDetalle : idPedido
					};
					this.modalService.abrirModalConComponente(SeguimientoPedidoComponent, dataModal1, 'sm-modal');
				break;
			}
		}, 150);
	}

	protected cancelarPedido (idPedido : number) : void {
		this.msj.mensajeConfirmacionCustom('¿Está seguro de cancelar el pedido?', 'question', 'Cancelar pedido #PE-'+idPedido).then(
			respuestaMensaje => {
				if (respuestaMensaje.isConfirmed) {
					this.msj.mensajeEsperar();
					this.apiProductos.cancelarPedido(idPedido).subscribe(
						respuesta => {
							this.obtenerPedidos().then(() => {
								this.validarMostrarPedidos();
							});
						}, error => {
							this.msj.mensajeGenerico('error', 'error');
						}
					);
				}
				return;
			}
		);
	}

	private validarMostrarPedidos () : void {
		this.obtenerPedidos();
		if (this.pedidos.length > 0) {
			this.msj.mensajeGenericoToast('Se canceló el pedido con éxito', 'info');
		} else {
			this.cerrarModal();
			this.msj.mensajeGenerico('Al parecer aún no haz realizado ninguna compra. Te invitamos a realizar alguna compra de nuestras ofertas', 'info', 'Pedidos');
		}
		return;
	}

	public cerrarModal() {
		this.modalService.cerrarModal();
	}
}