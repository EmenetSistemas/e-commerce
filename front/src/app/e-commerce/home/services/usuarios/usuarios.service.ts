import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import { environment } from 'src/environments/environment';
import { ModalService } from '../modal/modal.service';
import { LoginRegisterComponent } from '../../modules/login-register/login-register.component';

@Injectable({
	providedIn: 'root'
})
export class UsuariosService {
	private url = environment.api;

	constructor(
		private http : HttpClient,
		private msj : MensajesService,
		private modalService : ModalService
	) { }

	public validarPerfilUsuario () : any {
		const token = localStorage.getItem('token') ?? null;
		let retorno : boolean = false;

		if (!token) {
			this.msj.mensajeConfirmacionCustom('Al parecer no haz iniciado sesión, es necesario para poder comprar o agregar productos a tu carrito. ¿Deseas iniciar sesión para realizar estas y más acciones?', 'question', 'Sesión no iniciada').then(
				respuesta => {
					if (respuesta.isConfirmed) {
						this.modalService.cerrarModal();
						setTimeout(() => {
							this.modalService.abrirModalConComponente(LoginRegisterComponent, {}, '');
						}, 150);
					}
				}
			);
			retorno = true;
		}

		return retorno;
	}

	public obtenerDatosSesion (token : any) : Observable<any> {
		return this.http.post<any>(this.url+'/usuarios/obtenerDatosSesion', {token});
	}

	public login (data : any) : Observable<any> {
		return this.http.post<any>(this.url+'/usuarios/login', data);
	}

	public registrarUsuario (data : any) : Observable<any> {
		return this.http.post<any>(this.url+'/usuarios/registro', data);
	}

	public actualizarUsuario (data : any) : Observable<any> {
		return this.http.post<any>(this.url+'/usuarios/modificacion', data);
	}
}