import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos/productos.service';

@Component({
	selector: 'app-destacados',
	templateUrl: './destacados.component.html',
	styleUrls: ['./destacados.component.css']
})
export class DestacadosComponent implements OnInit {
	public data_carrousel: any = [
		{
			img: 'https://ddtech.mx/assets/uploads/91b25d0a1ee86725d788e7d1de13fbf7.jpg',
			title: 'La mejor PC Gamer',
			description: 'El ensamble más competitivo en el mercado actual',
			rutaDestino: '',
			color: 'white',
			active: true
		}, {
			img: 'https://ddtech.mx/assets/uploads/4dbe962e6d576f1e513706e599b5f027.jpg',
			title: 'La mejor PC Gamer',
			description: 'El ensamble más competitivo en el mercado actual',
			rutaDestino: '',
			color: 'blue',
			active: false
		}
	];

	public slides = Array.from({ length: this.data_carrousel.length }, (_, index) => index);

	public productosDestacados : any = [];

	constructor (
		private apiProductos : ProductosService
	) {

	}

	ngOnInit(): void {
		this.obtenerProductosDestacados();
	}

	protected obtenerProductosDestacados () : any {
		this.productosDestacados = this.apiProductos.obtenerProductosDestacados();
	}
}