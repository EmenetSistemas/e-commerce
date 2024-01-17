import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import { PedidosComponent } from '../../modules/pedidos/pedidos.component';
import { ProductosService } from '../../services/productos/productos.service';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { LoginRegisterComponent } from '../../modules/login-register/login-register.component';

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
		setInterval(() => {
			this.obtenerDatosUsuario();
			this.obtenerPedidos();
		}, 1000);
	}

	protected obtenerDatosUsuario () : void {
		const token = localStorage.getItem('token');
		if (token != null) {
			this.apiUsuarios.obtenerDatosSesion(token).subscribe(
				respuesta => {
					if (respuesta.data.status == 204) {
						localStorage.clear();
						return;
					}
	
					this.usuario = respuesta.data;
				}, error => {
					this.msj.mensajeGenerico('error', 'error');
				}
			);
		}
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

	protected abrirModalLogin () {
		this.modalService.abrirModalConComponente(LoginRegisterComponent, {}, '');
	}

	protected cerrarSesion () : void {
		this.msj.mensajeConfirmacionCustom('¿Está seguro de cerrar sesión?', 'question', 'Cerrar sesión').then(
			respuesta => {
				if (respuesta.isConfirmed) {
					this.usuario = {};
					localStorage.clear();
					this.msj.mensajeGenerico('Hasta la próxima...!', 'success', 'Sesión finalizada');
				}
			}
		);
	}
}