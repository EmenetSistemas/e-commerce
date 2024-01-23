import { Component, ElementRef, HostListener, ViewChild, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos/productos.service';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';

@Component({
	selector: 'app-productos',
	templateUrl: './productos.component.html',
	styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
	@HostListener('window:resize', ['$event'])
	@ViewChild('accordionButton') accordionButton!: ElementRef;

	public categorias : any = [];
	protected productosMostrar: any = [];
	protected window: any;

	constructor(
		private apiProductos : ProductosService,
		private msj : MensajesService
	) {
		this.window = window;
	}

	async ngOnInit(): Promise<void> {
		this.msj.mensajeEsperar();
		await this.obtenerCategorias()
		this.msj.cerrarMensajes();
	}

	private obtenerCategorias () : Promise<any> {
		return this.apiProductos.obtenerCategoriasApartados().toPromise().then(
			respuesta => {
				this.categorias = respuesta.data.categoriasApartados;
			}, error => {
				this.msj.mensajeGenerico('error', 'error');
			}
		);
	}

	public obtenerProductosPorIdCategoriaApartado(event: Event, idCategoria: number, idApartado: number) {
		const categoria = this.categorias.find((categoria : any) => categoria.id === idCategoria);
		const apartado = categoria?.apartados.find((apartado : any) => apartado.id === idApartado);
		const checkbox = event.target as HTMLInputElement;

		if (checkbox.checked) {
			this.productosMostrar = this.apiProductos.obtenerProductosPorCategoriaApartado(idCategoria, idApartado);
			if (apartado !== undefined) {
				this.desactivarApartados();
				apartado.check = !apartado.check;
			}
			this.accordionButton.nativeElement.click();
		} else {
			this.desactivarApartados();
			this.productosMostrar = [];
		}
	}

	public productosDestacados() {
		this.desactivarApartados();
		this.productosMostrar = [];
		this.accordionButton.nativeElement.click();
	}

	private desactivarApartados() {
		this.categorias.forEach((cat : any) => {
			cat.apartados.forEach((a : any) => {
				a.check = false;
			});
		});
	}
}