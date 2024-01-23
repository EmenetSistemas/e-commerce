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

	public obtenerItemsCarritoCompras( data : any = carritoCompras): Observable<any> {
		const itemsCarritoIds = data.items.map((item: any) => item.idItem);
	
		return productos.filter((producto: any) => {
			if (itemsCarritoIds.includes(producto.id)) {
				const itemEnCarrito = data.items.find((item: any) => item.idItem === producto.id);
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
			itemExistente.cantidad = Number(itemExistente.cantidad) + Number(cantidad);
		} else {
			const nuevoItem = {
				idItem: idItem,
				cantidad: cantidad
			};
			carritoCompras.items.push(nuevoItem);
		}
	
		return carritoCompras;
	}

	public vaciarCarrito () : any {
		carritoCompras.items = [];
	}

	public eliminarItemCarrito (idProducto : number) : Observable<any> {
		carritoCompras.items = carritoCompras.items.filter(
			(item : any) => item.idItem !== idProducto
		);

		return carritoCompras;
	}

	public productosEnCarrito (idProducto : number) : Observable<any> {
		return carritoCompras.items.find((item : any) => item.idItem === idProducto)?.cantidad ?? 0;
	}

	public obtenerTotalSegunProductos ( dataProductos : any ) : any {
		let totalPorProductos = 0;
		dataProductos.forEach((itSearch : any) => {
			productos.forEach((producto : any) => {
				if (producto.id == itSearch.idItem) {
					totalPorProductos += ((producto.precio - (producto.precio * producto.descuento)) * itSearch.cantidad);
				}
			});
		});

		return totalPorProductos;
	}

	public agregarPedido (dataPedido : any, carrito : boolean = false) : any {
		dataPedido.idPedido = pedidos.items.length + 1;
		pedidos.items.push(dataPedido);

		if (carrito) {
			this.vaciarCarrito();
		}
	}

	public obtenerPedidos () : any {
		return pedidos.items;
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