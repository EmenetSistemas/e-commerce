import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { ProductosService } from '../../services/productos/productos.service';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import { PedidosComponent } from '../pedidos/pedidos.component';
import FGenerico from 'src/app/shared/util/funciones-genericas';

@Component({
	selector: 'app-venta-producto',
	templateUrl: './venta-producto.component.html',
	styleUrls: ['./venta-producto.component.css']
})
export class VentaProductoComponent extends FGenerico implements OnInit {
	@Input() productos: any = [];

	@ViewChild('productosBtn') productosBtn!: ElementRef;
	@ViewChild('procederAlPagoBtn') procederAlPagoBtn!: ElementRef;
	@ViewChild('realizarPedidoBtn') realizarPedidoBtn!: ElementRef;

	protected productosVenta: any = [];
	protected usuario : any = {};
	protected totalCompra : number = 0;

	constructor(
		private modalService : ModalService,
		private apiProductos : ProductosService,
		private msj : MensajesService
	) {
		super();
	}

	ngOnInit(): void {
		this.msj.mensajeEsperar();
		this.obtenerDatosUsuario();
		this.obtenerProductosVenta();
		this.msj.cerrarMensajes();
	}
	private obtenerDatosUsuario () : void {
		this.usuario = this.apiProductos.obtenerDatosUsusario();
	}

	protected obtenerProductosVenta () : any {
		this.productosVenta = this.apiProductos.obtenerItemsCarritoCompras(this.productos);
	}

	public obtenerCantidadTotal () : any {
		return this.productos.items.length;
	}

	public obtenerTotalArticulos () : any {
		return this.productos.items.reduce((acumulador : any, item : any) => acumulador + item.cantidad, 0);
	}

	protected obtenerTotalSegunProductos () : any {
		return this.apiProductos.obtenerTotalSegunProductos(this.productos.items);
	}

	protected cambioCantidadProducto (data: any) : void {
		const producto = this.productos.items.find((item : any) => item.idItem == data.idProducto);
		if (producto) {
			producto.cantidad = data.cantidad;
		}
	}

	protected eliminarProducto (data : any) : any {
		this.productos.items = this.productos.items.filter(
			(item : any) => item.idItem !== data.idProducto
		);
		this.obtenerProductosVenta();

		if (this.productos.static) {
			this.apiProductos.cancelarProductoPedido(this.productos.idPedido, data.idProducto);
			if (this.productosVenta.length > 0) {
				this.msj.mensajeGenericoToast('Se eliminó el producto del pedido', 'success');
			} else {
				this.apiProductos.cancelarPedido(this.productos.idPedido);
				this.cerrarModal();
				if (this.apiProductos.obtenerPedidos().length > 0) {
					this.abrirModal();
					return;
				}
				this.msj.mensajeGenerico('Al parecer no hay más productos en este pedido', 'info', 'Productos pedido #PE-'+this.productos.idPedido);
			}
			return;
		}

		if (this.productosVenta.length > 0) {
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
		this.procederAlPagoBtn.nativeElement.click();
	}

	protected realizarPedido() {
		this.msj.mensajeConfirmacionCustom('Favor de validar la información antes de realizar el pedido', 'question', 'Realizar pedido').then(
			confirmacion => {
				if (confirmacion.isConfirmed) {
					this.msj.mensajeEsperar();

					const fechaActual = new Date();
			
					const dataPedido = {
						fechaPedido : fechaActual.toISOString(),
						direccionEntrega : (this.usuario.direccion.calle+' '+this.usuario.direccion.noExterior+', '+this.usuario.direccion.localidad+', '+this.usuario.direccion.municipio+', '+this.usuario.direccion.estado+'. '+this.usuario.direccion.cp),
						fechaEntrega : this.fechaEntregaEstimada(),
						productos : this.productos.items
					};
			
					this.apiProductos.agregarPedido(dataPedido);
			
					setTimeout(() => {
						this.msj.mensajeGenericoToast('Pedido realizada con éxito', 'success');
						this.realizarPedidoBtn.nativeElement.click();
					}, 1000);
				}
				return;
			}
		);
	}

	public fechaEntregaEstimada () : any {
		let fechaMasDosDias = new Date();
		fechaMasDosDias.setDate(fechaMasDosDias.getDate() + 2);
		fechaMasDosDias.setHours(0, 0, 0, 0);

		return fechaMasDosDias.toISOString();
	}

	public cerrarModal() {
		this.modalService.cerrarModal();
	}
}