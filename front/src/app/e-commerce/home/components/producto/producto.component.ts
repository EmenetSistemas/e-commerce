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
		
		this.msj.mensajeEsperar();

		const data = {
			idItem : this.productoGen.id,
			cantidad : 1,
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
}