import { Component, HostListener, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { ProductosService } from '../../services/productos/productos.service';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import { shared } from 'src/environments/environment';
import { DataService } from '../../services/data.service';

@Component({
	selector: 'app-carrousel-productos',
	templateUrl: './carrousel-productos.component.html',
	styleUrls: ['./carrousel-productos.component.css']
})
export class CarrouselProductosComponent implements OnChanges {
	@Input() apartados: any = [];
	@Output() emitirIdProducto: EventEmitter<any> = new EventEmitter<any>();

	protected productosAgrupados: any[] = [];
	protected productosPasarela: any[] = [];
	protected indices: number[] = [];

	private apartadosComp : any = [];

	protected currentIndex = 0;

	constructor(
		private apiProductos: ProductosService,
		private msj: MensajesService,
		private dataService: DataService
	) {
		this.dataService.actualizarPantalla.subscribe(() => {
			this.productosMostrar();
		});
	}

	ngOnChanges(): void {
		this.obtenerProductosPorApartados();
	}

	private obtenerProductosPorApartados() : void {
		if (this.apartadosComp == this.apartados) return;
		this.apiProductos.obtenerProductosPorApartados(this.apartados).subscribe(
			respuesta => {
				this.productosAgrupados = respuesta.data.productosAgrupados;
				this.productosMostrar();
				this.apartadosComp = this.apartados;
			}, error => {
				this.msj.mensajeGenerico('error', 'error');
			}
		);
	}

	private productosMostrar(): void {
		let cantidad: number;
		if (shared.screenWidth < 768) {
			cantidad = 1;
		} else if (shared.screenWidth < 991) {
			cantidad = 2;
		} else if (shared.screenWidth < 1400) {
			cantidad = 4;
		} else {
			cantidad = 6;
		}
	
		const maxIndices = Math.min(cantidad, this.productosAgrupados.length);
	
		this.indices = [];
		for (let i = 0; i < maxIndices; i++) {
			const index = (this.currentIndex + i) % this.productosAgrupados.length;
			this.indices.push(index);
		}
	
		if (this.indices.length >= this.productosAgrupados.length) {
			this.productosPasarela = this.productosAgrupados;
		} else {
			this.productosPasarela = this.indices.map(index => this.productosAgrupados[index]);
		}
	}

	protected itemSiguiente() {
		this.currentIndex = (this.currentIndex + 1) % this.productosAgrupados.length;
		this.productosMostrar();
	}

	protected itemAnterior() {
		this.currentIndex = (this.currentIndex - 1 + this.productosAgrupados.length) % this.productosAgrupados.length;
		this.productosMostrar();
	}

	protected emitirDatos (idProducto : number) : void {
		this.emitirIdProducto.emit(idProducto);
	}
}
