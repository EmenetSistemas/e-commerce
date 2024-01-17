import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import { PedidosComponent } from '../../modules/pedidos/pedidos.component';
import { ProductosService } from '../../services/productos/productos.service';
import { UsuariosService } from '../../services/usuarios/usuarios.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
	protected pedidos : number = 0;
	protected usuario : any = {};

	constructor(
		private modalService: ModalService,
		private msj : MensajesService,
		private apiProductos : ProductosService,
		private apiUsuarios : UsuariosService
	) { }

	ngOnInit(): void {
		this.obtenerDatosUsuario();
		setInterval(() => {
			this.obtenerPedidos();
		}, 1000);
	}

	private obtenerDatosUsuario () : void {
		const token = localStorage.getItem('token');
		this.apiProductos.obtenerDatosSesion(token).subscribe(
			respuesta => {
				if (respuesta.data.length == 0) {
					localStorage.clear();
					return;
				}
			}, error => {
				this.msj.mensajeGenerico('error', 'error');
			}
		);
	}

	private obtenerPedidos () : any {
		this.pedidos = this.apiProductos.obtenerPedidos()?.length;
	}

	protected abrirModal (modal : string) {
		if (this.apiUsuarios.validarPerfilUsuario()) return;
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