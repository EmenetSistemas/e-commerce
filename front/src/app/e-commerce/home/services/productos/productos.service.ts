import { Injectable } from '@angular/core';
import { carritoCompras, environment, pedidos, productos } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ProductosService {
	private url = environment.api;

	constructor(
		private http : HttpClient
	) {}

	public obtenerCategoriasApartados () : Observable<any> {
		return this.http.get<any>(this.url + '/dashboard/productos/obtenerCategoriasApartados');
	}

	public obtenerProductosPorApartado (idApartado : number) : Observable<any> {
		return this.http.get<any>(this.url + '/e-commerce/productos/obtenerProductosPorApartado/'+idApartado);
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
		return this.http.get<any>(this.url + '/e-commerce/productos/obtenerDetalleProductoPorId/'+idProducto);
	}

	public obtenerDetalleProductosVenta (porductos : any) : Observable<any> {
		return this.http.post<any>(this.url + '/e-commerce/productos/obtenerDetalleProductosVenta', porductos);
	}

	public agregarItemCarrito (data : any) : Observable<any> {
		return this.http.post<any>(this.url + '/e-commerce/carritoCompras/agregarItemCarrito', data);
	}

	public obtenerNoItemsCarritoCompras (token : any) : Observable<any> {
		return this.http.get<any>(this.url + '/e-commerce/carritoCompras/obtenerNoItemsCarritoCompras/'+token);
	}

	public obtenerItemsCarritoCompras (token : any) : Observable<any> {
		return this.http.get<any>(this.url + '/e-commerce/carritoCompras/obtenerItemsCarritoCompras/'+token);
	}

	public eliminarItemCarrito (eliminarItemCarrito : number) : Observable<any> {
		return this.http.get<any>(this.url + '/e-commerce/carritoCompras/eliminarItemCarrito/'+eliminarItemCarrito);
	}

	public vaciarCarrito (token : any) : Observable<any> {
		return this.http.get<any>(this.url + '/e-commerce/carritoCompras/vaciarCarrito/'+token);
	}
	
	public agregarPedido (pedido : any) : Observable<any> {
		return this.http.post<any>(this.url + '/e-commerce/pedidos/agregarPedido', pedido);
	}

	public obtenerNoPedidos (token :  any) : Observable<any> {
		return this.http.get<any>(this.url + '/e-commerce/pedidos/obtenerNoPedidos/'+ token);
	}

	public obtenerPedidos (token :  any) : Observable<any> {
		return this.http.get<any>(this.url + '/e-commerce/pedidos/obtenerPedidos/'+ token);
	}

	public cancelarPedido(idPedido: number): Observable<any> {
		pedidos.items = pedidos.items.filter((pedido : any) => pedido.idPedido !== idPedido);
		return pedidos;
	}

	public cancelarProductoPedido (idPedido : number, idProducto : number) : Observable<any> {
		const pedido = pedidos.items.find((pedido: any) => pedido.idPedido === idPedido);

  		if (pedido) {
    		pedido.productos = pedido.productos.filter((producto: any) => producto.idItem !== idProducto);
  		}

		return pedidos;
	}
}