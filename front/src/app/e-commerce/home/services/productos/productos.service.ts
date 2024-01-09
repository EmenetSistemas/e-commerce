import { Injectable } from '@angular/core';
import { carritoCompras, categorias, productos } from '../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ProductosService {

	constructor() { }

	public obtenerCategorias () : Observable<any> {
		return categorias;
	}

	public obtenerProductosPorCategoriaApartado(idCategoria : number, idApartado : number) : Observable<any> {
		let productosEncontrados : any = [];
		productos.forEach((producto : any) => {
			if (producto.idCategoria == idCategoria && producto.idApartado == idApartado) {
				productosEncontrados = [...productosEncontrados, producto];
			}
		});
		return productosEncontrados;
	}

	public obtenerProductosDestacados () : Observable<any> {
		const calificaciones = productos.map((producto : any) => producto.calificacion);
		const sumaCalificaciones = calificaciones.reduce((total : any, calificacion : any) => total + calificacion, 0);
		const mediaCalificaciones = sumaCalificaciones / calificaciones.length;

		let productosDestacados : any = [];
		productos.forEach((producto : any) => {
			if (producto.calificaciones > mediaCalificaciones) {
				productosDestacados = [...productosDestacados, producto];
			}
		});

		return productosDestacados;
	}

	public obtenerDetalleProductoPorId ( idProducto : number ) : Observable<any> {
		return productos.find((producto : any) => producto.id == idProducto);
	}

	public obtenerNoItemsCarritoCompras () : Observable<any> {
		return carritoCompras.items.length;
	}

	public obtenerCantidadProductoPorId ( idItem : number ) : Observable<any> {
		return carritoCompras.items.length;
	}

	public obtenerItemsCarritoCompras(): Observable<any> {
		const itemsCarritoIds = carritoCompras.items.map((item: any) => item.idItem);
	
		return productos.filter((producto: any) => {
			if (itemsCarritoIds.includes(producto.id)) {
				const itemEnCarrito = carritoCompras.items.find((item: any) => item.idItem === producto.id);
				producto.cantidad = itemEnCarrito.cantidad;
				return true;
			}
			return false;
		});
	}	

	public validarProductoCarrito ( idItem : number ) : Observable<any> {
		return carritoCompras.items.find((item : any) => item.idItem == idItem) ?? null;
	}

	public agregarItemCarrito (idItem: number, cantidad: number = 1): Observable<any> {
		const itemExistente = carritoCompras.items.find((item : any) => item.idItem === idItem);
	
		if (itemExistente) {
			itemExistente.cantidad += cantidad;
		} else {
			const nuevoItem = {
				idItem: idItem,
				cantidad: cantidad
			};
			carritoCompras.items.push(nuevoItem);
		}
	
		return carritoCompras;
	}
}