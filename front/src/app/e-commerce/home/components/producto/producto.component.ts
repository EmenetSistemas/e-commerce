import { Component, Input } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { DetalleProductoComponent } from '../../modules/detalle-producto/detalle-producto.component';
import { ProductosService } from '../../services/productos/productos.service';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import { VentaProductoComponent } from '../../modules/venta-productos/venta-producto.component';
import { UsuariosService } from '../../services/usuarios/usuarios.service';

@Component({
	selector: 'app-producto',
	templateUrl: './producto.component.html',
	styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
	@Input() productoGen: any = [];

	protected producto : any = {};

	constructor(
		private modalService : ModalService,
		private apiProductos : ProductosService,
		private apiUsuarios : UsuariosService,
		private msj : MensajesService
	) { }

	ngOnInit() : void {
		
	}

	protected abrirModal ( modal : string ) : any {
		switch (modal) {
			case 'detalleProducto':
				const dataModal1 = {
					idProducto : this.productoGen.id
				};
				this.modalService.abrirModalConComponente(DetalleProductoComponent, dataModal1);
			break;
			case 'detalleCompra':
				if (this.apiUsuarios.validarPerfilUsuario()) return;
				const dataModal2 = {
					productos : {
						items : [{
							idItem : this.productoGen.id,
							cantidad : 1
						}]
					}
				};
				this.modalService.abrirModalConComponente(VentaProductoComponent, dataModal2);
			break;
		}
	}

	protected agregarItemCarrito () : any {
		if (this.apiUsuarios.validarPerfilUsuario()) return;
		
		this.msj.mensajeEsperarToast();
		try {
			const busquedaProd = this.apiProductos.validarProductoCarrito(this.productoGen.id);

			if (busquedaProd == null) {
				this.apiProductos.agregarItemCarrito(this.productoGen.id);
				this.msj.mensajeGenericoToast('Se agregó al carrito', 'success');
				return;
			}

			const productosEnCarrito : any = this.apiProductos.productosEnCarrito(this.productoGen.id);

			if ((Number(productosEnCarrito) + 1) > this.producto.stock) {
				this.msj.mensajeGenerico('Actualmente cuentas con ' +productosEnCarrito+(productosEnCarrito == 1 ? ' producto' : ' productos')+' en tu carrito, e intentas agregar ' + 1 + ' más, lo cual no es posible', 'warning', this.producto.stock + ' productos en stock');
				return;
			}

			this.msj.mensajeConfirmacionCustom('Al parecer ya se agregó este artículo a tu carrito. ¿Desea agregar 1 más?', 'question', 'Artículo en carrito').then(
				respuestaMensaje => {
					if ( respuestaMensaje.isConfirmed ) {
						this.msj.mensajeGenericoToast('Se agregó al carrito', 'success');
						this.apiProductos.agregarItemCarrito(this.productoGen.id);
						return;
					}
				}
			);
		} catch (e) {
			console.log(e);
			this.msj.mensajeGenerico('error', 'error');
		}
	}
}