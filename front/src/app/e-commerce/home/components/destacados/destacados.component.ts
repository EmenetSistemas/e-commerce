import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos/productos.service';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';

@Component({
	selector: 'app-destacados',
	templateUrl: './destacados.component.html',
	styleUrls: ['./destacados.component.css']
})
export class DestacadosComponent implements OnInit {
	public data_carrousel: any = [
		{
			img: 'https://ddtech.mx/assets/uploads/a8070fe0acf922d80b912a12ee809f12.png',
			title: '',
			description: '',
			rutaDestino: '',
			color: 'white',
			active: true
		}, {
			img: 'https://ddtech.mx/assets/uploads/089173e649a93447bbf72ebbda2f1bd8.jpg',
			title: '',
			description: '',
			rutaDestino: '',
			color: 'blue',
			active: false
		}
	];

	public slides = Array.from({ length: this.data_carrousel.length }, (_, index) => index);

	public productosDestacados : any = [];

	constructor (
		private apiProductos : ProductosService,
		private msj : MensajesService
	) {}

	ngOnInit(): void {
		this.obtenerProductosDestacados();
	}

	protected obtenerProductosDestacados () : any {
		this.msj.mensajeEsperar();
		this.apiProductos.obtenerProductosDestacados().subscribe(
			respuesta => {
				this.productosDestacados = respuesta.data.productosDestacados;
				this.msj.cerrarMensajes();
			}, error => {
				this.msj.mensajeGenerico('error', 'error');
			}
		);
	}
}