import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import FGenerico from 'src/app/shared/util/funciones-genericas';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import { UsuariosService } from '../../services/usuarios/usuarios.service';

@Component({
	selector: 'app-login-register',
	templateUrl: './login-register.component.html',
	styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent extends FGenerico implements OnInit{
	protected op : number = 0;

	protected titulos : any = [
		'Iniciar sesión',
		'Registro cuenta'
	];

	protected formLogin! : FormGroup;
	protected formDatosPersonalesSocio! : FormGroup;
  	protected formDetalleDomicilioSocio! : FormGroup;
	protected formMetodoPago! : FormGroup;

	private check = false;

	constructor (
		private modalService : ModalService,
		private fb : FormBuilder,
		private msj : MensajesService,
		private apiUsuarios : UsuariosService
	) {
		super();
	}

	ngOnInit(): void {
		this.crearFormLogin();
		this.crearFormDatosPersonalesSocio();
		this.crearFormDetalleDomicilioSocio();
		this.crearFormMetodoPago();
		this.cambiarCampos();
	}

	private crearFormLogin () : any {
		this.formLogin = this.fb.group({
			correo 		: [null, [Validators.required, Validators.email, Validators.pattern('[a-zA-Zá-úÁ-Ú0-9 .,-@#$%&+{}()?¿!¡]*')]],
			password 	: [null, [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-Ú0-9 .,-@#$%&+{}()?¿!¡]*')]]
		});
	}

	private crearFormDatosPersonalesSocio () : void {
		this.formDatosPersonalesSocio = this.fb.group({
			nombre 			: [null, [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-Ú ]*')]],
			aPaterno 		: [null, [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-Ú ]*')]],
			aMaterno 		: [null, [Validators.pattern('[a-zA-Zá-úÁ-Ú ]*')]],
			telefono 		: [null, [Validators.required, Validators.pattern('[0-9]*')]],
			correo 			: [null, [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-Ú0-9 .,-@#$%&+{}()?¿!¡]*'), Validators.email]],
			password 		: [null, [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-Ú0-9 .,-@#$%&+{}()?¿!¡]*')]],
			confirmPassword	: [null, [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-Ú0-9 .,-@#$%&+{}()?¿!¡]*')]]
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

	protected iniciarSesion () : void {
		if (this.formLogin.invalid) {
			this.msj.mensajeGenerico('Aún hay campos vacíos o que no cumplen con la estructura correcta.', 'warning', 'Los campos requeridos están marcados con un *');
			return;
		}

		this.msj.mensajeEsperar();
		this.apiUsuarios.login(this.formLogin.value).subscribe(
			respuesta => {
				if(respuesta.status != 200){
					this.msj.mensajeGenerico(respuesta.mensaje, 'warning');
					return;
				}
				 
				this.cerrarModal();
				localStorage.setItem('token', respuesta.data.token);
				this.msj.mensajeGenerico(respuesta.mensaje, 'success');
			}, error => {
				this.msj.mensajeGenerico('error', 'error');
			}
		);
	}

	protected registrarMetodoPago () : void {
		this.check = !this.check;
		this.cambiarCampos();
	}

	private cambiarCampos () {
		if(this.check == false){
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

	protected registrarNuevoUsuario () {
		if (this.formDatosPersonalesSocio.invalid) {
			this.msj.mensajeGenerico('Aún hay campos vacíos o que no cumplen con la estructura correcta de la Información personal.', 'warning', 'Los campos requeridos están marcados con un *');
			return;
		}

		if (this.formDatosPersonalesSocio.value.password != this.formDatosPersonalesSocio.value.confirmPassword) {
			this.msj.mensajeGenerico('Al parecer las contraseñas no coinciden', 'warning', 'Contraseñas diferentes');
			return;
		}

		if (this.formDatosPersonalesSocio.value.password.length < 8) {
			this.msj.mensajeGenerico('La contraseña debe contener al menos 8 caracteres', 'warning', 'Contraseña inválida');
			return;
		}

		if (!/[A-Z]/.test(this.formDatosPersonalesSocio.value.password)) {
			this.msj.mensajeGenerico('La contraseña debe contener al menos una mayuscula', 'warning', 'Contraseña inválida');
			return;
		}

		if (!/\d/.test(this.formDatosPersonalesSocio.value.password)) {
			this.msj.mensajeGenerico('La contraseña debe contener al menos un número', 'warning', 'Contraseña inválida');
			return;
		}

		if (/(123|abc|xyz|987|zyx|cba)/i.test(this.formDatosPersonalesSocio.value.password)) {
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

		this.msj.mensajeConfirmacionCustom('Favor de asegurarse que los datos sean correctos', 'question', 'Registro usuario').then(
			respuestaMensaje => {
				if (respuestaMensaje.isConfirmed) {
					this.msj.mensajeEsperar();
					const data = {
						...this.formDatosPersonalesSocio.value,
						...this.formDetalleDomicilioSocio.value,
						...this.formMetodoPago.value
					};

					this.apiUsuarios.registrarUsuario(data).subscribe(
						respuesta => {
							if ( respuesta.status == 409 ) {
								this.msj.mensajeGenerico(respuesta.mensaje, 'warning');
								return;
							}

							this.cerrarModal();
							localStorage.setItem('token', respuesta.data.token);
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
		this.formLogin.reset();
		this.formDatosPersonalesSocio.reset();
		this.formDetalleDomicilioSocio.reset();
		this.formMetodoPago.reset();
	}

	public cerrarModal() {
		this.limpiarFormularios();
		this.modalService.cerrarModal();
	}
}