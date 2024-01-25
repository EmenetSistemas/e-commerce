import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import { PedidosComponent } from '../../modules/pedidos/pedidos.component';
import { ProductosService } from '../../services/productos/productos.service';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { LoginRegisterComponent } from '../../modules/login-register/login-register.component';
import { ModificacionUsuarioComponent } from '../../modules/modificacion-usuario/modificacion-usuario.component';

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

	ngOnInit() : void {
		this.obtenerDatosUsuario();
		this.obtenerPedidos();

		setInterval(() => {
			this.obtenerPedidos();
		}, 5000);
	}

	protected obtenerDatosUsuario () : void {
		const token = localStorage.getItem('token');
		if (token != null) {
			this.apiUsuarios.obtenerDatosSesion(token).subscribe(
				respuesta => {
					if (respuesta.data.status == 204) {
						localStorage.removeItem('token');
						localStorage.clear();
						return;
					}
	
					this.usuario = respuesta.data;
				}, error => {
					this.msj.mensajeGenerico('error', 'error');
				}
			);
		} else {
			this.usuario = {};
			localStorage.removeItem('token');
			localStorage.clear();
		}
	}

	private obtenerPedidos () : any {
		const token = localStorage.getItem('token');
		if (token != null) {
			this.apiProductos.obtenerNoPedidos(token).subscribe(
				respuesta => {
					this.pedidos = respuesta.data.noPedidos;
				}
			);
		}
	}

	protected abrirModal (modal : string) {
		if (this.apiUsuarios.validarPerfilUsuario()) return;
		
		switch (modal) {
			case 'pedidos':
				if (this.pedidos == 0) {
					this.msj.mensajeGenerico('Al parecer aún no haz realizado ninguna compra. Te invitamos a realizar alguna compra de nuestras ofertas', 'info', 'Pedidos');
					return;
				}
				this.msj.mensajeEsperar();
				this.modalService.abrirModalConComponente(PedidosComponent);
			break;
			case 'modificarPerfil':
				this.modalService.abrirModalConComponente(ModificacionUsuarioComponent, {}, '');
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
					localStorage.removeItem('token');
					localStorage.clear();
					this.obtenerDatosUsuario();
					this.msj.mensajeGenerico('Hasta la próxima...!', 'success', 'Sesión finalizada');
				}
			}
		);
	}
}