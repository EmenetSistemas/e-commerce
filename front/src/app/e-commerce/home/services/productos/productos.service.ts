import { Injectable } from '@angular/core';
import { categorias, productos } from '../../../../../environments/environment';
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
				console.log(producto.calificaciones);
				console.log(mediaCalificaciones);
				productosDestacados = [...productosDestacados, producto];
			}
		});

		return productosDestacados;
	}
}