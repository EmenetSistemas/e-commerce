import { Component, Input, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { ProductosService } from '../../services/productos/productos.service';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import FGenerico from 'src/app/shared/util/funciones-genericas';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VentaProductoComponent } from '../venta-productos/venta-producto.component';
import { UsuariosService } from '../../services/usuarios/usuarios.service';

@Component({
	selector: 'app-detalle-producto',
	templateUrl: './detalle-producto.component.html',
	styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent extends FGenerico implements OnInit {
	@Input() idProducto: any = {};
	@ViewChild('cantidadInput') cantidadInput!: ElementRef;
	@ViewChild('btnCerrar') btnCerrar!: ElementRef;

	protected formVentaProducto!: FormGroup;

	protected producto: any = {};
	protected ultimaCantidad: any = 1;

	constructor(
		private modalService : ModalService,
		private apiProductos : ProductosService,
		private apiUsuarios : UsuariosService,
		private msj : MensajesService,
		private fb : FormBuilder,
		private renderer : Renderer2
	) {
		super();
	}

	async ngOnInit() : Promise<any> {
		this.crearFormVentaProducto();
		this.msj.mensajeEsperar();
		await this.obtenerDetalleProductoPorId();
		this.msj.cerrarMensajes();
	}

	private crearFormVentaProducto(): void {
		this.formVentaProducto = this.fb.group({
			cantidad: ['1', [Validators.required, Validators.pattern('[0-9]*')]]
		});
	}

	private obtenerDetalleProductoPorId (idProducto : number = this.idProducto) : Promise<any>{
		return this.apiProductos.obtenerDetalleProductoPorId(idProducto).toPromise().then(
			respuesta => {
				this.producto = respuesta.data.detalleProducto[0];
			}, error => {
				this.msj.mensajeGenerico('error', 'error');
			}
		);
	}

	protected agregarItemCarrito(): any {
		if (this.apiUsuarios.validarPerfilUsuario()) return;
		
		this.msj.mensajeEsperar();

		const data = {
			idItem : this.idProducto,
			cantidad : this.formVentaProducto.get('cantidad')?.value,
			token : localStorage.getItem('token')
		};

		this.apiProductos.agregarItemCarrito(data).subscribe(
			respuesta => {
				if (respuesta.error == 402) {
					this.msj.mensajeGenerico(respuesta.mensaje, 'warning', respuesta.titulo);
					return;
				}

				this.msj.mensajeGenericoToast(respuesta.mensaje, 'success');
			}, error => {
				this.msj.mensajeGenerico('error', 'error');
			}
		);
	}

	protected validarStock(): any {
		const cantidad = this.formVentaProducto.get('cantidad')?.value;

		if (cantidad <= 0) {
			this.formVentaProducto.get('cantidad')?.setValue('1');
			this.ultimaCantidad = 1;
			this.msj.mensajeGenericoToast('Se debe colocar una cantidad entre 1 y el stock disponible', 'warning');
			this.seleccionarTexto();
		} else if (cantidad > this.producto.stock) {
			this.formVentaProducto.get('cantidad')?.setValue(this.ultimaCantidad ?? 1);
			this.msj.mensajeGenericoToast('Cantidad de productos fuera de stock', 'error');
			this.seleccionarTexto();
		} else {
			this.ultimaCantidad = cantidad;
		}
	}

	private seleccionarTexto() {
		const inputEl = this.cantidadInput.nativeElement;
		this.renderer.selectRootElement(inputEl).select();
	}

	protected abrirModal ( modal : string ) : any {
		if (this.apiUsuarios.validarPerfilUsuario()) return;
		this.cerrarModal();

		setTimeout(() => {
			switch (modal) {
				case 'detalleCompra':
					const dataModal2 = {
						productos : {
							items : [
								{
									idItem : this.idProducto,
									cantidad : this.formVentaProducto.get('cantidad')?.value
								}
							]
						}
					};
					this.modalService.abrirModalConComponente(VentaProductoComponent, dataModal2);
				break;
			}
		}, 150);
	}

	protected async realizarFuncionPasarela (data : any) : Promise<void> {
		switch (data.option) {
			case 'detalleProducto':
				if (this.idProducto == data.idProducto) {
					this.msj.mensajeGenericoToast('Producto actual', 'success');
					return
				};
				this.msj.mensajeEsperar();
				await this.obtenerDetalleProductoPorId(data.idProducto);
				this.msj.cerrarMensajes();
			break;
			case 'detalleCompra':
				this.cerrarModal();
				const dataModal = {
					productos : {
						items : [
							{
								idItem : data.idProducto,
								cantidad : 1
							}
						]
					}
				};

				setTimeout(() => {
					this.modalService.abrirModalConComponente(VentaProductoComponent, dataModal);
				}, 150);
			break;
			case 'agregarCarrito':
				if (this.apiUsuarios.validarPerfilUsuario()) return;
		
				this.msj.mensajeEsperar();

				const dataCarrito = {
					idItem : data.idProducto,
					cantidad : 1,
					token : localStorage.getItem('token')
				};

				this.apiProductos.agregarItemCarrito(dataCarrito).subscribe(
					respuesta => {
						if (respuesta.error == 402) {
							this.msj.mensajeGenerico(respuesta.mensaje, 'warning', respuesta.titulo);
							return;
						}

						this.msj.mensajeGenericoToast(respuesta.mensaje, 'success');
					}, error => {
						this.msj.mensajeGenerico('error', 'error');
					}
				);
			break;
		}
	}

	public cerrarModal() {
		this.modalService.cerrarModal();
	}
}