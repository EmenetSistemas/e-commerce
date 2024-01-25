import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos/productos.service';
import { ModalService } from '../../services/modal/modal.service';
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
	}

	private obtenerPedidos () : void {
		const token = localStorage.getItem('token');
		this.apiProductos.obtenerPedidos(token).subscribe(
			respuesta => {
				this.pedidos = respuesta.data.pedidos;
				this.msj.cerrarMensajes();
			}, error => {
				this.msj.mensajeGenerico('error', 'error');
			}
		);
	}

	protected abrirModal (idPedido : number) : void {
		const itemsPedido = this.pedidos.find((pedido : any) => pedido.idPedido === idPedido);
		this.msj.mensajeEsperar();
		this.cerrarModal();
		setTimeout(() => {
			const dataModal = {
				productos : {
					items : itemsPedido.productos,
					static : true,
					idPedido : idPedido
				}
			};
			this.modalService.abrirModalConComponente(VentaProductoComponent, dataModal);
		}, 150);
	}

	protected cancelarPedido (idPedido : number) : void {
		this.msj.mensajeConfirmacionCustom('¿Está seguro de cancelar el pedido?', 'question', 'Cancelar pedido #PE-'+idPedido).then(
			respuestaMensaje => {
				if (respuestaMensaje.isConfirmed) {
					this.apiProductos.cancelarPedido(idPedido);
					this.validarMostrarPedidos();
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