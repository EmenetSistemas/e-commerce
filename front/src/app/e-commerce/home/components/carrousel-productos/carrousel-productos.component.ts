import { Component, HostListener, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos/productos.service';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import { shared } from 'src/environments/environment';
import { DataService } from '../../services/data.service';

@Component({
	selector: 'app-carrousel-productos',
	templateUrl: './carrousel-productos.component.html',
	styleUrls: ['./carrousel-productos.component.css']
})
export class CarrouselProductosComponent implements OnInit {
	protected productosAgrupados: any[] = [];
	protected productosPasarela: any[] = [];
	protected indices: number[] = [];

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

	ngOnInit(): void {
		this.obtenerProductosPorApartados();
	}

	private obtenerProductosPorApartados(): Promise<any> {
		return this.apiProductos.obtenerProductosPorApartados().toPromise().then(
			respuesta => {
				this.productosAgrupados = respuesta.data.productosAgrupados;
				this.productosMostrar();
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

	moveIndicesForward() {
		this.currentIndex = (this.currentIndex + 1) % this.productosAgrupados.length;
		this.productosMostrar();
	}

	moveIndicesBackward() {
		this.currentIndex = (this.currentIndex - 1 + this.productosAgrupados.length) % this.productosAgrupados.length;
		this.productosMostrar();
	}
}
