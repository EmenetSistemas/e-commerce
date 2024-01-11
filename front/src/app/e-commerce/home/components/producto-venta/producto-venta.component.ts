import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { ProductosService } from '../../services/productos/productos.service';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import FGenerico from 'src/app/shared/util/funciones-genericas';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-producto-venta',
	templateUrl: './producto-venta.component.html',
	styleUrls: ['./producto-venta.component.css']
})
export class ProductoVentaComponent extends FGenerico implements OnInit{
	@Input() idProducto: any = [];
	@Input() cantidadProducto: any = 0;
	@ViewChild('cantidadInput') cantidadInput!: ElementRef;
	@Output() selectionChange: EventEmitter<any> = new EventEmitter<any>();
	@Output() eliminoProducto: EventEmitter<any> = new EventEmitter<any>();

	protected formVentaProducto!: FormGroup;

	protected producto: any = {};
	protected ultimaCantidad: any = this.cantidadProducto;

	constructor(
		private apiProductos: ProductosService,
		private msj: MensajesService,
		private fb: FormBuilder,
		private renderer: Renderer2
	) {
		super();
	}

	ngOnInit(): void {
		this.crearFormVentaProducto();
		this.obtenerDetalleProductoPorId(this.idProducto);
	}

	private crearFormVentaProducto(): void {
		this.formVentaProducto = this.fb.group({
			cantidad: [this.cantidadProducto, [Validators.required, Validators.pattern('[0-9]*')]]
		});
	}

	private obtenerDetalleProductoPorId(idProducto: number): any {
		this.producto = this.apiProductos.obtenerDetalleProductoPorId(idProducto);
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

		this.enviaCambioCantidadProducto(this.ultimaCantidad);
	}

	private enviaCambioCantidadProducto(cantidad : number) : any {
		const data = {
			idProducto : this.idProducto,
			cantidad : cantidad
		};
		this.selectionChange.emit(data);
	}

	private seleccionarTexto() {
		const inputEl = this.cantidadInput.nativeElement;
		this.renderer.selectRootElement(inputEl).select();
	}

	protected eliminarItemCompra (idProducto : number) : any {
		this.msj.mensajeConfirmacionCustom('¿Está seguro de eliminar el producto de la compra?', 'question', 'Eliminar producto').then(
			respuestaMensaje => {
				if ( respuestaMensaje.isConfirmed ) {
					this.msj.mensajeEsperarToast();
					this.envioProductoEliminar(idProducto);
				}
				return;
			}
		);
	}

	private envioProductoEliminar(idProducto : number) : any {
		const data = {
			idProducto : idProducto
		};
		this.eliminoProducto.emit(data);
	}
}