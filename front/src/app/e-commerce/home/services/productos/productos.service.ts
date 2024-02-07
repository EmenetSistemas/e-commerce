import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
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
		return this.http.get<any>(this.url + '/e-commerce/productos/obtenerProductosDestacados');
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
		return this.http.post<any>(this.url + '/e-commerce/carritoCompras/obtenerNoItemsCarritoCompras',{token});
	}

	public obtenerItemsCarritoCompras (token : any) : Observable<any> {
		return this.http.post<any>(this.url + '/e-commerce/carritoCompras/obtenerItemsCarritoCompras',{token});
	}

	public eliminarItemCarrito (eliminarItemCarrito : number) : Observable<any> {
		return this.http.get<any>(this.url + '/e-commerce/carritoCompras/eliminarItemCarrito/'+eliminarItemCarrito);
	}

	public vaciarCarrito (token : any) : Observable<any> {
		return this.http.post<any>(this.url + '/e-commerce/carritoCompras/vaciarCarrito',{token});
	}
	
	public agregarPedido (pedido : any) : Observable<any> {
		return this.http.post<any>(this.url + '/e-commerce/pedidos/agregarPedido', pedido);
	}

	public obtenerNoPedidos (token :  any) : Observable<any> {
		return this.http.post<any>(this.url + '/e-commerce/pedidos/obtenerNoPedidos', {token});
	}

	public obtenerPedidos (token :  any) : Observable<any> {
		return this.http.post<any>(this.url + '/e-commerce/pedidos/obtenerPedidos', {token});
	}

	public cancelarPedido (idPedido :  any) : Observable<any> {
		return this.http.get<any>(this.url + '/e-commerce/pedidos/cancelarPedido/'+ idPedido);
	}
	
	public cancelarProductoPedido (idPedido : number, idProducto : number) : Observable<any> {
		return this.http.get<any>(this.url + '/e-commerce/pedidos/cancelarProductoPedido/'+ idPedido+'/'+idProducto);
	}

	public obtenerActualizacionesPedido (idPedido :  any) : Observable<any> {
		return this.http.get<any>(this.url + '/e-commerce/pedidos/obtenerActualizacionesPedido/'+ idPedido);
	}

	public obtenerNombresProductosTienda () : Observable<any> {
		return this.http.get<any>(this.url + '/e-commerce/productos/obtenerNombresProductosTienda');
	}
	
	public obtenerProductosBusqueda (producto : string) : Observable<any> {
		return this.http.post<any>(this.url + '/e-commerce/productos/obtenerProductosBusqueda', {producto});
	}

	public obtenerProductosPorApartados () : Observable<any> {
		return this.http.get<any>(this.url + '/e-commerce/productos/obtenerProductosPorApartados');
	}
}