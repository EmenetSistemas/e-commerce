import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos/productos.service';

@Component({
	selector: 'app-carrito-compras',
	templateUrl: './carrito-compras.component.html',
	styleUrls: ['./carrito-compras.component.css']
})
export class CarritoComprasComponent implements OnInit {
	protected noItemsCarrito: any = 0;
	protected itemsCarrito: any = [];

	constructor(private apiProductos: ProductosService) {}

	ngOnInit(): void {
		this.obtenerItemsCarritoCompras();

		setInterval(() => {
			this.obtenerNoItemsCarritoCompras();
		}, 1000);
	}

	private obtenerNoItemsCarritoCompras(): any {
		this.noItemsCarrito = this.apiProductos.obtenerNoItemsCarritoCompras();
	}

	private obtenerItemsCarritoCompras(items: any = 0): any {
		this.itemsCarrito = this.apiProductos.obtenerItemsCarritoCompras();
	}
}