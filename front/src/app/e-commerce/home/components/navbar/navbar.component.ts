import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import { PedidosComponent } from '../../modules/pedidos/pedidos.component';
import { ProductosService } from '../../services/productos/productos.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
	protected pedidos : number = 0;
	constructor(
		private modalService: ModalService,
		private msj : MensajesService,
		private apiPrductos : ProductosService
	) { }

	ngOnInit(): void {
		this.obtenerPedidos();
	}

	private obtenerPedidos () : any {
		this.pedidos = this.apiPrductos.obtenerPedidos()?.length;
	}

	protected abrirModal (modal : string) {
		if (this.pedidos == 0) {
			this.msj.mensajeGenerico('Al parecer aún no haz realizado ninguna compra. Te invitamos a realizar alguna compra de nuestras ofertas', 'info', 'Pedidos');
			return;
		}
		switch (modal) {
			case 'pedidos':
				this.modalService.abrirModalConComponente(PedidosComponent);
			break;
		}
	}
}