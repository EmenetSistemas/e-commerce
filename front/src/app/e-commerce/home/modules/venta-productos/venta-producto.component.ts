import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { ProductosService } from '../../services/productos/productos.service';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import { PedidosComponent } from '../pedidos/pedidos.component';
import FGenerico from 'src/app/shared/util/funciones-genericas';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { ModificacionUsuarioComponent } from '../modificacion-usuario/modificacion-usuario.component';

@Component({
	selector: 'app-venta-producto',
	templateUrl: './venta-producto.component.html',
	styleUrls: ['./venta-producto.component.css']
})
export class VentaProductoComponent extends FGenerico implements OnInit {
	@Input() productos: any = {};

	@ViewChild('productosBtn') productosBtn!: ElementRef;
	@ViewChild('procederAlPagoBtn') procederAlPagoBtn!: ElementRef;
	@ViewChild('realizarPedidoBtn') realizarPedidoBtn!: ElementRef;

	protected usuario : any = {};
	protected fechaEntregaEstimada : any = {};
	protected totalCompra : number = 0;

	constructor(
		private modalService : ModalService,
		private apiProductos : ProductosService,
		private apiUsuarios : UsuariosService,
		private msj : MensajesService
	) {
		super();
	}

	async ngOnInit(): Promise<void> {
		this.msj.mensajeEsperar();
		await Promise.all([
			this.obtenerDatosUsuario(),
			this.obtenerDetalleProductosVenta()
		]);
		this.msj.cerrarMensajes();
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
			}, error => {
				localStorage.removeItem('token');
				localStorage.clear();
				this.msj.mensajeGenerico('error', 'error');
			}
		);
	}

	protected async obtenerDetalleProductosVenta () : Promise<any> {
		return this.apiProductos.obtenerDetalleProductosVenta(this.productos.items).toPromise().then(
			respuesta => {
				this.productos.items = respuesta.data.detalleProductos;
				this.fechaEntregaEstimada = respuesta.data.fechaEntregaEstimada;
			}, error => {
				this.msj.mensajeGenerico('error', 'error');
			}
		);
	}

	public obtenerCantidadTotal () : any {
		return this.productos.items.length;
	}

	public obtenerTotalArticulos () : any {
		return this.productos.items.reduce((acumulador : any, item : any) => acumulador + item.cantidad, 0);
	}

	protected obtenerTotalSegunProductos () : any {
		let totalPorProductos : number = 0;
		this.productos.items.forEach((producto : any) => {
			totalPorProductos += ((producto.precio - (producto.precio * producto.descuento)) * producto.cantidad);
		});
		return totalPorProductos;
	}

	protected cambioCantidadProducto (data: any) : void {
		const producto = this.productos.items.find((item : any) => item.id == data.idProducto);
		if (producto) {
			producto.cantidad = data.cantidad;
		}
	}

	protected async eliminarProducto (data : any) : Promise<any> {
		this.msj.mensajeEsperar();

		this.productos.items = this.productos.items.filter(
			(item : any) => item.id !== data.idProducto
		);

		if (this.productos.static) {
			this.apiProductos.cancelarProductoPedido(this.productos.idPedido, data.idProducto).subscribe(
				respuesta => {
					if (this.productos.items.length > 0) {
						this.msj.mensajeGenericoToast('Se eliminó el producto del pedido', 'success');
						return;
					} else {
						this.cerrarModal();
						this.apiProductos.cancelarPedido(this.productos.idPedido).subscribe(
							respuesta => {
								this.msj.mensajeGenerico('Al parecer no hay más productos en este pedido', 'info', 'Productos pedido #PE-'+this.productos.idPedido);
								return;
							}, error => {
								this.msj.mensajeGenerico('error', 'error');
							}
						);
						return;
					}
					return;
				}, error => {
					this.msj.mensajeGenerico('error', 'error');
				}
			);
			return;
		}

		if (this.productos.items.length > 0) {
			this.msj.mensajeGenericoToast('Se eliminó el producto de la compra', 'success');
		} else {
			this.cerrarModal();
			this.msj.mensajeGenerico('Al parecer no hay productos para continuar con la compra', 'info', 'Compra productos');
		}
	}

	protected abrirModal () : any {
		this.msj.mensajeEsperar();
		this.cerrarModal();
		setTimeout(() => {
			this.modalService.abrirModalConComponente(PedidosComponent);
		}, 150);
	}

	protected verProductos() {
		this.productosBtn.nativeElement.click();
	}

	protected procederPago() {
		if (this.usuario.metodoPago.noTarjeta != null) {
			this.procederAlPagoBtn.nativeElement.click();
			return;
		}

		this.msj.mensajeConfirmacionCustom('Al parecer aún no haz registrado un método de pago, ¿Deseas actualizar tu información?', 'question', 'Sin método de pago').then(
			respuesta => {
				if (respuesta.isConfirmed) {
					this.cerrarModal();
					setTimeout(() => {
						this.modalService.abrirModalConComponente(ModificacionUsuarioComponent, {}, '');
					}, 150);
				}
			}
		);
	}

	protected realizarPedido() {
		this.msj.mensajeConfirmacionCustom('Favor de validar la información antes de realizar el pedido', 'question', 'Realizar pedido').then(
			confirmacion => {
				if (confirmacion.isConfirmed) {
					this.msj.mensajeEsperar();
			
					const dataPedido = {
						token 				 : localStorage.getItem('token'),
						pkDireccion 		 : this.usuario.direccion.pkTblDireccion,
						fechaEntregaEstimada : this.fechaEntregaEstimada,
						productos 			 : this.productos.items
					};
			
					this.apiProductos.agregarPedido(dataPedido).subscribe(
						respuesta => {
							if (this.productos.carrito) {
								this.vaciarCarrito();
							}

							this.realizarPedidoBtn.nativeElement.click();
							this.msj.mensajeGenericoToast(respuesta.mensaje, 'success');
						}, error => {
							this.msj.mensajeGenerico('error', 'error');
						}
					);
				}
				return;
			}
		);
	}

	private async vaciarCarrito () : Promise<any> {
		const token = localStorage.getItem('token');
		return this.apiProductos.vaciarCarrito(token).toPromise().then(
			respuesta => {
				// se realizó con exito
			}, error => {
				this.msj.mensajeGenerico('error', 'error');
			}
		);
	}

	public cerrarModal() {
		this.modalService.cerrarModal();
	}
}