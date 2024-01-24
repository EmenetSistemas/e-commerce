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

	private obtenerDetalleProductoPorId () : Promise<any>{
		return this.apiProductos.obtenerDetalleProductoPorId(this.idProducto).toPromise().then(
			respuesta => {
				this.producto = respuesta.data.detalleProducto[0];
			}, error => {
				this.msj.mensajeGenerico('error', 'error');
			}
		);
	}

	protected agregarItemCarrito(): any {
		if (this.apiUsuarios.validarPerfilUsuario()) return;
		this.msj.mensajeEsperarToast();
		try {
			const cantidad = this.formVentaProducto.get('cantidad')?.value;
			const busquedaProd = this.apiProductos.validarProductoCarrito(this.idProducto);

			if (busquedaProd == null) {
				this.apiProductos.agregarItemCarrito(this.idProducto, cantidad);
				this.msj.mensajeGenericoToast('Se agregó al carrito', 'success');
				return;
			}

			const productosEnCarrito : any = this.apiProductos.productosEnCarrito(this.idProducto);

			if ((Number(productosEnCarrito) + Number(cantidad)) > this.producto.stock) {
				this.msj.mensajeGenerico('Actualmente cuentas con ' +productosEnCarrito+(productosEnCarrito == 1 ? ' producto' : ' productos')+' en tu carrito, e intentas agregar ' + cantidad + ' más, lo cual no es posible', 'warning', this.producto.stock + ' productos en stock');
				return;
			}

			this.msj.mensajeConfirmacionCustom('Al parecer ya se agregó este artículo a tu carrito. ¿Desea agregar ' + cantidad + ' más?', 'question', 'Artículo en carrito').then(
				respuestaMensaje => {
					if (respuestaMensaje.isConfirmed) {
						this.msj.mensajeGenericoToast('Se agregó al carrito', 'success');
						this.apiProductos.agregarItemCarrito(this.idProducto, cantidad);
						return;
					}
				}
			);
		} catch (e) {
			console.log(e);
			this.msj.mensajeGenerico('error', 'error');
		}
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
							items : [{
								idItem : this.idProducto,
								cantidad : this.formVentaProducto.get('cantidad')?.value
							}]
						}
					};
					this.modalService.abrirModalConComponente(VentaProductoComponent, dataModal2);
				break;
			}
		}, 150);
	}

	public cerrarModal() {
		this.modalService.cerrarModal();
	}
}