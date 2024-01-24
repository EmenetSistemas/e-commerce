import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import FGenerico from 'src/app/shared/util/funciones-genericas';
import { ModalService } from '../../services/modal/modal.service';
import { UsuariosService } from '../../services/usuarios/usuarios.service';

@Component({
	selector: 'app-modificacion-usuario',
	templateUrl: './modificacion-usuario.component.html',
	styleUrls: ['./modificacion-usuario.component.css']
})
export class ModificacionUsuarioComponent extends FGenerico implements OnInit{
	protected formDatosPersonalesSocio! : FormGroup;
  	protected formDetalleDomicilioSocio! : FormGroup;
	protected formMetodoPago! : FormGroup;

	protected usuario : any = [];
	private checkMP = false;
	private checkCP = false;

	constructor(
		private fb : FormBuilder,
		private msj : MensajesService,
		private modalService : ModalService,
		private apiUsuarios : UsuariosService
	) {
		super();
	}

	async ngOnInit(): Promise<any> {
		this.msj.mensajeEsperar();
		this.crearFormDatosPersonalesSocio();
		this.crearFormDetalleDomicilioSocio();
		this.crearFormMetodoPago();
		await this.obtenerDatosUsuario();
		this.cambiarCamposMP();
		this.cambiarCamposCP();
		this.msj.cerrarMensajes();
	}

	private crearFormDatosPersonalesSocio () : void {
		this.formDatosPersonalesSocio = this.fb.group({
			nombre 			: [null, [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-Ú ]*')]],
			aPaterno 		: [null, [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-Ú ]*')]],
			aMaterno 		: [null, [Validators.pattern('[a-zA-Zá-úÁ-Ú ]*')]],
			telefono 		: [null, [Validators.required, Validators.pattern('[0-9]*')]],
			correo 			: [null, [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-Ú0-9 .,-@#$%&+{}()?¿!¡]*'), Validators.email]],
			password 		: [null, []],
			confirmPassword	: [null, []]
		});
	}

	private crearFormDetalleDomicilioSocio () : void {
		this.formDetalleDomicilioSocio = this.fb.group({
			calle 		: [null, [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-Ú0-9 .,-@#$%&+{}()?¿!¡]*')]],
			noExterior 	: [null, [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-Ú0-9 .,-@#$%&+{}()?¿!¡]*')]],
			cp 			: [null, [Validators.required, Validators.pattern('[0-9]*')]],
			localidad 	: [null, [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-Ú ]*')]],
			municipio 	: [null, [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-Ú ]*')]],
			estado 		: [null, [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-Ú ]*')]],
			referencias : [null, [Validators.pattern('[a-zA-Zá-úÁ-Ú0-9 .,-@#$%&+{}()?¿!¡]*')]]
		});
	}

	private crearFormMetodoPago () : void {
		this.formMetodoPago = this.fb.group({
			noTarjeta : [],
			tipo : [],
			emisor : []
		});
	}

	private obtenerDatosUsuario () : Promise<any> {
		const token = localStorage.getItem('token');
		
		return this.apiUsuarios.obtenerDatosSesion(token).toPromise().then(
			respuesta => {
				if (respuesta.data.status == 204) {
					localStorage.removeItem('token');
					localStorage.clear();
					return;
				}

				this.usuario = respuesta.data;
				this.cargarFromularios();
			}, error => {
				this.msj.mensajeGenerico('error', 'error');
			}
		);
	}

	private cargarFromularios () : void {
		this.formDatosPersonalesSocio.get('nombre')?.setValue(this.usuario.nombre);
		this.formDatosPersonalesSocio.get('aPaterno')?.setValue(this.usuario.aPaterno);
		this.formDatosPersonalesSocio.get('aMaterno')?.setValue(this.usuario.aMaterno);
		this.formDatosPersonalesSocio.get('telefono')?.setValue(this.usuario.telefono);
		this.formDatosPersonalesSocio.get('correo')?.setValue(this.usuario.correo);

		this.formDetalleDomicilioSocio.get('calle')?.setValue(this.usuario.direccion.calle);
		this.formDetalleDomicilioSocio.get('noExterior')?.setValue(this.usuario.direccion.noExterior);
		this.formDetalleDomicilioSocio.get('cp')?.setValue(this.usuario.direccion.cp);
		this.formDetalleDomicilioSocio.get('localidad')?.setValue(this.usuario.direccion.localidad);
		this.formDetalleDomicilioSocio.get('municipio')?.setValue(this.usuario.direccion.municipio);
		this.formDetalleDomicilioSocio.get('estado')?.setValue(this.usuario.direccion.estado);
		this.formDetalleDomicilioSocio.get('referencias')?.setValue(this.usuario.direccion.referencias);

		this.formMetodoPago.get('noTarjeta')?.setValue(this.usuario.metodoPago.noTarjeta);
		this.formMetodoPago.get('tipo')?.setValue(this.usuario.metodoPago.tipo);
		this.formMetodoPago.get('emisor')?.setValue(this.usuario.metodoPago.emisor);
	}

	protected registrarMetodoPago () : void {
		this.checkMP = !this.checkMP;
		this.cambiarCamposMP();
	}

	protected cambiarPassword () : void {
		this.checkCP = !this.checkCP;
		this.cambiarCamposCP();
	}

	protected obtenerFormatoYDatosTarjeta () : void {
		const tarjeta = this.formMetodoPago.get('noTarjeta')?.value;

		if (tarjeta.length > 0) {
			this.formMetodoPago.get('noTarjeta')?.setValue(tarjeta.replace(/\D/g, '').match(/.{1,4}/g).join(' '));
			this.formMetodoPago.get('tipo')?.setValue(this.determinarTipoTarjeta(tarjeta));
			this.formMetodoPago.get('emisor')?.setValue(this.obtenerEmisor(tarjeta));
		} else {
			this.formMetodoPago.get('tipo')?.setValue(null);
			this.formMetodoPago.get('emisor')?.setValue(null);
		}
	}

	private cambiarCamposMP () {
		if(this.checkMP == false){
			this.formMetodoPago.controls['noTarjeta']?.disable();
			this.formMetodoPago.controls['tipo']?.disable();
			this.formMetodoPago.controls['emisor']?.disable();
			this.formMetodoPago.get('noTarjeta')?.setValue(null);
			this.formMetodoPago.get('tipo')?.setValue(null);
			this.formMetodoPago.get('emisor')?.setValue(null);
		  	this.formMetodoPago.get('noTarjeta')?.clearValidators();
		  	this.formMetodoPago.get('noTarjeta')?.updateValueAndValidity();
	  	} else {
			this.formMetodoPago.controls['noTarjeta']?.enable();
			this.formMetodoPago.controls['tipo']?.enable();
			this.formMetodoPago.controls['emisor']?.enable();
		  	this.formMetodoPago.get('noTarjeta')?.setValidators([Validators.required, Validators.pattern('[0-9 ]*')]);
		  	this.formMetodoPago.get('noTarjeta')?.updateValueAndValidity();
	  	}
	}

	private cambiarCamposCP () {
		if(this.checkCP == false){
			this.formDatosPersonalesSocio.controls['password']?.disable();
			this.formDatosPersonalesSocio.controls['confirmPassword']?.disable();
			this.formDatosPersonalesSocio.get('password')?.setValue(null);
			this.formDatosPersonalesSocio.get('confirmPassword')?.setValue(null);
		  	this.formDatosPersonalesSocio.get('password')?.clearValidators();
		  	this.formDatosPersonalesSocio.get('password')?.updateValueAndValidity();
			this.formDatosPersonalesSocio.get('confirmPassword')?.clearValidators();
		  	this.formDatosPersonalesSocio.get('confirmPassword')?.updateValueAndValidity();
	  	} else {
			this.formDatosPersonalesSocio.controls['password']?.enable();
			this.formDatosPersonalesSocio.controls['confirmPassword']?.enable();
		  	this.formDatosPersonalesSocio.get('password')?.setValidators([Validators.required, Validators.pattern('[a-zA-Zá-úÁ-Ú0-9 .,-@#$%&+{}()?¿!¡]*')]);
		  	this.formDatosPersonalesSocio.get('password')?.updateValueAndValidity();
			this.formDatosPersonalesSocio.get('confirmPassword')?.setValidators([Validators.required, Validators.pattern('[a-zA-Zá-úÁ-Ú0-9 .,-@#$%&+{}()?¿!¡]*')]);
		  	this.formDatosPersonalesSocio.get('confirmPassword')?.updateValueAndValidity();
	  	}
	}

	protected acutualizarUsuario () {
		if (this.formDatosPersonalesSocio.invalid) {
			this.msj.mensajeGenerico('Aún hay campos vacíos o que no cumplen con la estructura correcta de la Información personal.', 'warning', 'Los campos requeridos están marcados con un *');
			return;
		}

		if (this.formDatosPersonalesSocio.value.password != this.formDatosPersonalesSocio.value.confirmPassword) {
			this.msj.mensajeGenerico('Al parecer las contraseñas no coinciden', 'warning', 'Contraseñas diferentes');
			return;
		}

		if (this.checkCP && this.formDatosPersonalesSocio.value.password.length < 8) {
			this.msj.mensajeGenerico('La contraseña debe contener al menos 8 caracteres', 'warning', 'Contraseña inválida');
			return;
		}

		if (this.checkCP && !/[A-Z]/.test(this.formDatosPersonalesSocio.value.password)) {
			this.msj.mensajeGenerico('La contraseña debe contener al menos una mayuscula', 'warning', 'Contraseña inválida');
			return;
		}

		if (this.checkCP && !/\d/.test(this.formDatosPersonalesSocio.value.password)) {
			this.msj.mensajeGenerico('La contraseña debe contener al menos un número', 'warning', 'Contraseña inválida');
			return;
		}

		if (this.checkCP && /(123|abc|xyz|987|zyx|cba)/i.test(this.formDatosPersonalesSocio.value.password)) {
			this.msj.mensajeGenerico('La contraseña no debe contener secuencias de 3 caracteres o más. Ej. (abc, 123, etc)', 'warning', 'Contraseña inválida');
			return;
		}		  

		if (this.formDetalleDomicilioSocio.invalid) {
			this.msj.mensajeGenerico('Aún hay campos vacíos o que no cumplen con la estructura correcta del Detalle del domicilio.', 'warning', 'Los campos requeridos están marcados con un *');
			return;
		}

		if (this.formMetodoPago.invalid) {
			this.msj.mensajeGenerico('Aún hay campos vacíos o que no cumplen con la estructura correcta del Método de pago.', 'warning', 'Los campos requeridos están marcados con un *');
			return;
		}

		this.msj.mensajeConfirmacionCustom('Favor de asegurarse que los datos sean correctos', 'question', 'Actualuzar información').then(
			respuestaMensaje => {
				if (respuestaMensaje.isConfirmed) {
					this.msj.mensajeEsperar();
					const data = {
						...this.formDatosPersonalesSocio.value,
						...this.formDetalleDomicilioSocio.value,
						...this.formMetodoPago.value,
						token : localStorage.getItem('token')
					};

					this.apiUsuarios.actualizarUsuario(data).subscribe(
						respuesta => {
							if ( respuesta.status == 409 ) {
								this.msj.mensajeGenerico(respuesta.mensaje, 'warning');
								return;
							}

							this.cerrarModal();
							this.msj.mensajeGenerico(respuesta.mensaje, 'success');
							return;
						}, error => {
							this.msj.mensajeGenerico('error', 'error');
						}
					);
				}
			}
		);
	}

	private limpiarFormularios() : void {
		this.formDatosPersonalesSocio.reset();
		this.formDetalleDomicilioSocio.reset();
		this.formMetodoPago.reset();
	}

	public cerrarModal() {
		this.limpiarFormularios();
		this.modalService.cerrarModal();
	}
}